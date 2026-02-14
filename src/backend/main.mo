import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Nat32 "mo:core/Nat32";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Category = {
    id : Nat32;
    name : Text;
    iconUrl : Text;
  };

  type Product = {
    id : Nat32;
    seller : Principal;
    name : Text;
    description : Text;
    priceCents : Nat32;
    category : Category;
    imageUrl : Text;
    stock : Nat32;
    isActive : Bool;
  };

  type CartItem = {
    productId : Nat32;
    quantity : Nat32;
  };

  type ShippingAddress = {
    name : Text;
    street : Text;
    city : Text;
    state : Text;
    zipCode : Text;
    country : Text;
    phoneNumber : Text;
  };

  type Order = {
    id : Nat32;
    buyer : Principal;
    items : [CartItem];
    shippingAddress : ShippingAddress;
    totalCents : Nat32;
    status : {
      #created;
      #shipped;
      #delivered;
      #cancelled;
    };
  };

  type UserProfile = {
    displayName : Text;
    email : Text;
    isSeller : Bool;
  };

  type ProductInput = {
    name : Text;
    description : Text;
    priceCents : Nat32;
    categoryId : Nat32;
    imageUrl : Text;
    stock : Nat32;
  };

  module ProductModule {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat32.compare(p1.id, p2.id);
    };
  };

  // Marketplace state
  var nextProductId : Nat32 = 1;
  var nextOrderId : Nat32 = 1;
  let productMap = Map.empty<Nat32, Product>();
  let orderMap = Map.empty<Nat32, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let userCarts = Map.empty<Principal, List.List<CartItem>>();
  let categories = Map.empty<Nat32, Category>();

  // Initialize categories explicitly using Nat32 keys
  categories.add(Nat32.fromNat(1_233142314), {
    id = Nat32.fromNat(1_233142314);
    name = "Clothing";
    iconUrl = "/assets/clothing.png";
  });
  categories.add(Nat32.fromNat(2_233142314), {
    id = Nat32.fromNat(2_233142314);
    name = "Electronics";
    iconUrl = "/assets/electronics.png";
  });
  categories.add(Nat32.fromNat(3_233142314), {
    id = Nat32.fromNat(3_233142314);
    name = "Home";
    iconUrl = "/assets/home.png";
  });
  categories.add(Nat32.fromNat(4_233142314), {
    id = Nat32.fromNat(4_233142314);
    name = "Toys";
    iconUrl = "/assets/toys.png";
  });

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product listing functions - accessible to everyone including guests
  public query ({ caller }) func getAllActiveProducts() : async [Product] {
    let allProducts = productMap.values().toArray();
    allProducts.filter(func(p) { p.isActive });
  };

  public query ({ caller }) func getProductsByCategory(categoryId : Nat32) : async [Product] {
    let allProducts = productMap.values().toArray();
    allProducts.filter(
      func(p) { p.category.id == categoryId and p.isActive }
    );
  };

  public query ({ caller }) func getProduct(id : Nat32) : async Product {
    switch (productMap.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getCategories() : async [Category] {
    categories.values().toArray();
  };

  // Seller dashboard functions
  public shared ({ caller }) func createProduct(productInput : ProductInput) : async Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can create products");
    };

    let category = getCategoryById(productInput.categoryId);

    let product : Product = {
      id = nextProductId;
      seller = caller;
      name = productInput.name;
      description = productInput.description;
      priceCents = productInput.priceCents;
      category = category;
      imageUrl = productInput.imageUrl;
      stock = productInput.stock;
      isActive = true;
    };

    productMap.add(nextProductId, product);
    nextProductId += 1;
    product;
  };

  public shared ({ caller }) func updateProduct(productId : Nat32, productInput : ProductInput) : async Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can update products");
    };

    let oldProduct = switch (productMap.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };

    if (oldProduct.seller != caller) {
      Runtime.trap("Unauthorized: Only seller can edit this product");
    };

    let category = getCategoryById(productInput.categoryId);

    let updatedProduct = {
      oldProduct with
      name = productInput.name;
      description = productInput.description;
      priceCents = productInput.priceCents;
      category = category;
      imageUrl = productInput.imageUrl;
      stock = productInput.stock;
    };
    productMap.add(productId, updatedProduct);
    updatedProduct;
  };

  public shared ({ caller }) func deactivateProduct(productId : Nat32) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can deactivate products");
    };

    let product = switch (productMap.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };

    if (product.seller != caller) {
      Runtime.trap("Unauthorized: Only seller can deactivate this product");
    };

    let updatedProduct = { product with isActive = false };
    productMap.add(productId, updatedProduct);
  };

  // Cart management - requires user authentication
  public query ({ caller }) func getCart() : async [CartItem] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can have a cart");
    };

    switch (userCarts.get(caller)) {
      case (?cart) { cart.values().toArray() };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func addToCart(productId : Nat32, quantity : Nat32) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can add to cart");
    };

    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0") };

    let product = switch (productMap.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };

    if (not product.isActive) { Runtime.trap("Product is not active") };
    if (quantity > product.stock) { Runtime.trap("Quantity exceeds stock") };

    let cart = switch (userCarts.get(caller)) {
      case (?items) { items };
      case (null) { List.empty<CartItem>() };
    };

    let cartArray = cart.values().toArray();
    var found = false;
    var newQuantity : Nat32 = quantity;

    for (item in cartArray.values()) {
      if (item.productId == productId) {
        found := true;
        newQuantity := item.quantity + quantity;
        if (newQuantity > product.stock) { Runtime.trap("Quantity exceeds stock") };
      };
    };

    let newCart = if (found) {
      List.fromIter<CartItem>(
        cartArray.map<CartItem, CartItem>(
          func(item) {
            if (item.productId == productId) {
              { item with quantity = newQuantity };
            } else { item };
          }
        ).values()
      );
    } else {
      List.fromIter<CartItem>(
        cart.values().concat(List.fromArray<CartItem>([ { productId; quantity } ]).values())
      );
    };

    userCarts.add(caller, newCart);
  };

  public shared ({ caller }) func updateCartItem(productId : Nat32, quantity : Nat32) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can update cart");
    };

    let cart = switch (userCarts.get(caller)) {
      case (?items) { items };
      case (null) { List.empty<CartItem>() };
    };

    if (quantity == 0) {
      let newCart = List.fromIter<CartItem>(
        cart.values().toArray().filter(
          func(item) { item.productId != productId }
        ).values()
      );
      userCarts.add(caller, newCart);
    } else {
      let product = switch (productMap.get(productId)) {
        case (null) { Runtime.trap("Product not found") };
        case (?product) { product };
      };

      if (quantity > product.stock) { Runtime.trap("Quantity exceeds stock") };

      let cartArray = cart.values().toArray();
      let newCart = List.fromIter<CartItem>(
        cartArray.map(
          func(item) {
            if (item.productId == productId) {
              { item with quantity };
            } else { item };
          }
        ).values()
      );
      userCarts.add(caller, newCart);
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can clear cart");
    };
    userCarts.remove(caller);
  };

  // Order processing
  public shared ({ caller }) func createOrder(
    cartItems : [CartItem],
    shippingAddress : ShippingAddress
  ) : async Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create orders");
    };

    if (cartItems.size() == 0) { Runtime.trap("Cart is empty") };

    // Validate cart and calculate total
    var totalCents : Nat32 = 0;
    for (item in cartItems.values()) {
      let product = switch (productMap.get(item.productId)) {
        case (null) { Runtime.trap("Product not found") };
        case (?product) { product };
      };

      if (not product.isActive or product.stock < item.quantity) {
        Runtime.trap("Invalid cart item. Product not available");
      };
      totalCents += product.priceCents * item.quantity;
    };

    let order : Order = {
      id = nextOrderId;
      buyer = caller;
      items = cartItems;
      shippingAddress;
      totalCents;
      status = #created;
    };

    // Adjust product stock
    for (item in cartItems.values()) {
      let product = switch (productMap.get(item.productId)) {
        case (null) { Runtime.trap("Product not found") };
        case (?product) { product };
      };
      let updatedProduct = { product with stock = product.stock - item.quantity };
      productMap.add(item.productId, updatedProduct);
    };

    orderMap.add(nextOrderId, order);
    userCarts.remove(caller);
    nextOrderId += 1;
    order;
  };

  public query ({ caller }) func getOrderHistory() : async [Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access order history");
    };

    let allOrders = orderMap.entries().toArray();
    let userOrders = allOrders.filter(
      func((_, o)) { o.buyer == caller }
    );
    userOrders.map<(Nat32, Order), Order>(func((_, o)) { o });
  };

  public query ({ caller }) func getOrder(orderId : Nat32) : async Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access orders");
    };

    switch (orderMap.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        if (order.buyer != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Cannot access this order");
        };
        order;
      };
    };
  };

  // Helper functions
  func getCategoryById(id : Nat32) : Category {
    switch (categories.get(id)) {
      case (null) { Runtime.trap("Category does not exist") };
      case (?category) { category };
    };
  };
};

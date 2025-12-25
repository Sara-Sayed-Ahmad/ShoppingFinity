using ShoppingFinity.Model.AddDTOs;
using ShoppingFinity.Model.DTOs;
using ShoppingFinity.Model.GetDTOs;
using ShoppingFinity.Model.UpdateDTOs;

namespace ShoppingFinity.Repository
{
    public interface ShoppingIRepository
    {
        //Get Data:

        //Get all users in database
        Task<List<UserDTO>> GetAllUsers();

        //Get user by Id
        Task<UserDTO> GetUserById(string userId);

        //Get categoryies
        Task<List<CategoryDTO>> GetCategories();

        //Get category by Id
        Task<CategoryDTO> GetCategory(int categoryId);

        //Get details category
        Task<List<DetailsCategoryDTO>> GetDetails();

        //Get details category by id
        Task<DetailsCategoryDTO> GetDetailsById(int detailsId);

        //Get details category by category id
        Task<List<DetailsCategoryDTO>> GetDetailsByCate(int id);

        //Get products by detailsId
        Task<List<ProductDTo>> GetProductBydetails(int id);

        //Get all Products
        Task<List<ProductDTo>> GetProducts();

        //Get product by id
        Task<ProductDTo> GetProductById(int id);

        //Get payment types
        Task<List<PaymentTypeDTO>> GetAllPaymentType();

        //Get payment type by id
        Task<PaymentTypeDTO> GetPaymentTypeById(int id);

        //Get favorite
        Task<List<FavoriteDTO>> GetFavorite();

        //Get favorite by user id
        Task<List<FavoriteDTO>> GetFavoriteById(string idUser);

        //Get size by id
        Task<SizeDTO> GetSizeByIds(int idSize);

        //Get size by id product
        Task<List<ProductSizeDTO>> GetSizeByIdPro(int productId);

        //Get all reviews
        Task<List<ProductReviewDTO>> GetallReviews();

        //Get review by id
        Task<ProductReviewDTO> GetReviewById(int idReview);

        //Get review by id product
        Task<List<ProductReviewDTO>> GetReviewByIdPro(int idPro);

        //Get review by id user 
        Task<List<ProductReviewDTO>> GetReviewByIdUser(string userId);

        //Get orders
        Task<List<OrderDTO>> GetOrders();

        //Get order by id
        Task<OrderDTO> GetOrderById(int idOrder);

        //Get order by user id
        Task<List<OrderDTO>> GetOrderByUser(string userId);

        //Get transactions
        Task<List<TransactionDTO>> GetTransactions();

        //Get transaction by id
        Task<TransactionDTO> GetTransactionById(int id);

        //Get transaction by user id
        Task<List<TransactionDTO>> GetTransactionByUser(string iduser);

        //Get transaction by order id
        Task<List<TransactionDTO>> GetTransactionByOrder(int id);

        //Add Data:
        //- Added by admin:

        //1. Add Category
        Task AddCategories(AddCategoryDTO dataCategory);

        //2. Add details for each category added
        Task AddDetailsCategory(AddDetailsDTO detailsCategory);

        //3. Add product
        Task AddProduct(AddProductDTO product);

        //4. Add Size for product
        Task AddSizeProduct(AddSizeDTO size);

        //5. Add Payment Type 
        Task AddPaymentType(string paymentName);

        //6. Add Discount Type
        Task AddDiscountType(AddDiscounType discounType);

        //- Add by user:

        //1. Add product in favorite
        Task AddFavorite(AddFavoriteDTO favorite);

        //2. Add Order
        Task AddOrder(AddOrder order);

        //3. Add Review for product
        Task AddReview(AddReviewDTO review);

        //Update Data:
        //- Updated by admin:

        //1. Update Category
        Task UpdateCategory(int id, UpdateCategory category);

        //2. Update details category
        Task UpdateDetailsCategory(int id, UpdateDetailsCategory DeCategory);

        //3. Update product (available)
        Task IsAvailable(int id, bool IsAvailable);

        //Delete Data:
        //- Dealete by admin:

        //1. Delete payment type
        Task DeletePaymentType(int id);

        //2. Delete image product
        Task DeleteImage(int id);

        //3. Delete size product
        Task DeleteSize(int id);
    }
}
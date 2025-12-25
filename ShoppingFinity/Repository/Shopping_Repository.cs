using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShoppingFinity.Model;
using ShoppingFinity.Model.AddDTOs;
using ShoppingFinity.Model.DTOs;
using ShoppingFinity.Model.GetDTOs;
using ShoppingFinity.Model.UpdateDTOs;

namespace ShoppingFinity.Repository
{
    public class Shopping_Repository: ShoppingIRepository
    {
        private readonly SystemDbContext _context;
        private readonly IMapper _mapper;

        public Shopping_Repository(SystemDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //Get All Users
        public async Task<List<UserDTO>> GetAllUsers()
        {
            var users = await _context.User.Include(f => f.Favorites)
                .Include(t => t.Transactions)
                .ToListAsync();

            return _mapper.Map<List<UserDTO>>(users);
        }

        //Get User by Id
        public async Task<UserDTO> GetUserById(string userId)
        {
            var user = await _context.User.Where(u => u.Id == userId)
                .Include(f => f.Favorites)
                .Include(t => t.Transactions)
                .FirstOrDefaultAsync();

            return _mapper.Map<UserDTO>(user);
        }

        //Get all categories
        public async Task<List<CategoryDTO>> GetCategories()
        {
            var category = await _context.Categories
                .Include(p => p.Products)
                .Include(cd => cd.DetailsCategories).ToListAsync();

            return _mapper.Map<List<CategoryDTO>>(category);
        }

        //Get category by Id
        public async Task<CategoryDTO> GetCategory(int categoryId)
        {
            var category = await _context.Categories
                .Where(c => c.CategoryId == categoryId)
                .Include(de => de.DetailsCategories)
                .FirstOrDefaultAsync();   

            return _mapper.Map<CategoryDTO>(category);
        }

        //Get all detials of category
        public async Task<List<DetailsCategoryDTO>> GetDetails()
        {
            var Detcategory = await _context.DetailsCategories
                .Include(c => c.Category).ToListAsync();

            return _mapper.Map<List<DetailsCategoryDTO>>(Detcategory);
        }

        //Get details category by Id
        public async Task<DetailsCategoryDTO> GetDetailsById(int detailsId)
        {
            var DetailCate = await _context.DetailsCategories.Where(c => c.DetailsId == detailsId).FirstOrDefaultAsync();

            return _mapper.Map<DetailsCategoryDTO>(DetailCate);
        }

        //Get details category by category id
        public async Task<List<DetailsCategoryDTO>> GetDetailsByCate(int id)
        {
            var details = await _context.DetailsCategories.Where(c => c.CategoryId == id).ToListAsync();

            return _mapper.Map <List<DetailsCategoryDTO>>(details);
        }

        //Get products by detailsId
        public async Task<List<ProductDTo>> GetProductBydetails(int id)
        {
            var products = await _context.productCategories.Where(x => x.DetailsId == id)
                .Select(dp => dp.Product).ToListAsync();

            return _mapper.Map<List<ProductDTo>>(products);
        }

        //Get Products
        public async Task<List<ProductDTo>> GetProducts()
        {
            var product = await _context.Products
                .Include(img => img.Images)
                .Include(s => s.ProductSizes)
                .Include(c => c.Category)
                .Include(dc => dc.ProductCategories).ToListAsync();

            return _mapper.Map<List<ProductDTo>>(product);
        }

        //Get Product by id
        public async Task<ProductDTo> GetProductById(int id)
        {
            var product = await _context.Products
                .Include(img => img.Images)
                .Include(s => s.ProductSizes)
                .Include(c => c.Category)
                .Include(dc => dc.ProductCategories)
                .Where(p => p.ProductId == id).FirstOrDefaultAsync();

            return _mapper.Map<ProductDTo>(product);
        }

        //Get all Payment Types
        public async Task<List<PaymentTypeDTO>> GetAllPaymentType()
        {
            var paymentTypes = await _context.PaymentTypes.Include(pa => pa.PaymentTypeUsers).ToListAsync();

            return _mapper.Map<List<PaymentTypeDTO>>(paymentTypes);
        }

        //Get Payment Type by Id
        public async Task<PaymentTypeDTO> GetPaymentTypeById(int id)
        {
            var paymentType = await _context.PaymentTypes
                .Include(pa => pa.PaymentTypeUsers)
                .Where(pa => pa.PaymentId == id).FirstOrDefaultAsync();

            return _mapper.Map<PaymentTypeDTO>(paymentType);
        }

        //Get Favorite
        public async Task<List<FavoriteDTO>> GetFavorite()
        {
            var favorite = await _context.Favorites
                .Include(p => p.Product)
                .Include(u => u.User).ToListAsync();

            return _mapper.Map<List<FavoriteDTO>>(favorite);
        }

        //Get favorite by user id
        public async Task<List<FavoriteDTO>> GetFavoriteById(string idUser)
        {
            var favorite = await _context.Favorites.Where(u => u.UserId == idUser).ToListAsync();

            return _mapper.Map<List<FavoriteDTO>>(favorite);
        }

        //Get size by id
        public async Task <SizeDTO> GetSizeByIds(int idSize)
        {
            var size = await _context.Sizes.Where(x => x.SizeId == idSize).FirstOrDefaultAsync(); ;

            return _mapper.Map<SizeDTO>(size);
        }

        //Get size by id product
        public async Task<List<ProductSizeDTO>> GetSizeByIdPro(int productId)
        {
            var size = await _context.ProductSizes
                .Where(x => x.ProductId == productId).ToListAsync();

            return _mapper.Map<List<ProductSizeDTO>>(size);
        }
        
        //Get all reviews
        public async Task<List<ProductReviewDTO>> GetallReviews()
        {
            var reviews = await _context.ProductReviews
                .Include(p => p.Product)
                .Include(u => u.User).ToListAsync();

            return _mapper.Map<List<ProductReviewDTO>>(reviews);
        }

        //Get review by id
        public async Task<ProductReviewDTO> GetReviewById(int idReview)
        {
            var review = await _context.ProductReviews.Where(x => x.ReviewId == idReview).FirstOrDefaultAsync();

            return _mapper.Map<ProductReviewDTO>(review);
        }

        //Get review by id product
        public async Task<List<ProductReviewDTO>> GetReviewByIdPro(int idPro)
        {
            var review = await _context.ProductReviews.Where(x => x.ProductId == idPro).ToListAsync();

            return _mapper.Map<List<ProductReviewDTO>>(review);
        }

        //Get review by user id
        public async Task<List<ProductReviewDTO>> GetReviewByIdUser(string userId)
        {
            var review = await _context.ProductReviews.Where(x => x.UserId == userId).ToListAsync();

            return _mapper.Map<List<ProductReviewDTO>>(review);
        }

        //Get orders
        public async Task<List<OrderDTO>> GetOrders()
        {
            var order = await _context.Orders
                .Include(i => i.OrderItems)
                .Include(p => p.Products).ToListAsync();

            return _mapper.Map<List<OrderDTO>>(order);
        }

        //Get order by id
        public async Task<OrderDTO> GetOrderById(int idOrder)
        {
            var order = await _context.Orders.Where(x => x.OrderId == idOrder).FirstOrDefaultAsync();

            return _mapper.Map<OrderDTO>(order);
        }

        //Get order by user id
        public async Task<List<OrderDTO>> GetOrderByUser(string userId)
        {
            var order = await _context.Orders.Where(x => x.UserId == userId).ToListAsync();

            return _mapper.Map<List<OrderDTO>>(order);
        }

        //Get Transactions
        public async Task<List<TransactionDTO>> GetTransactions()
        {
            var transaction = await _context.Transactions
                .Include(u => u.User)
                .Include(o => o.Order).ToListAsync();

            return _mapper.Map<List<TransactionDTO>>(transaction);
        }

        //Get transaction by id
        public async Task<TransactionDTO> GetTransactionById(int id)
        {
            var trans = await _context.Transactions.Where(t => t.TransactionId == id).FirstOrDefaultAsync();

            return _mapper.Map<TransactionDTO>(trans);
        }

        //Get transaction by id user
        public async Task<List<TransactionDTO>> GetTransactionByUser(string iduser)
        {
            var trans = await _context.Transactions.Where(t => t.UserId == iduser).ToListAsync();

            return _mapper.Map<List<TransactionDTO>>(trans);
        }

        //Get transcation by order id
        public async Task<List<TransactionDTO>> GetTransactionByOrder(int id)
        {
            var trans = await _context.Transactions.Where(t => t.OrderId == id).ToListAsync();

            return _mapper.Map<List<TransactionDTO>>(trans);
        }

        //Add Category by admin
        public async Task AddCategories(AddCategoryDTO dataCategory)
        {
            var category = new Category()
            {
                CategoryName = dataCategory.CategoryName,
                Description = dataCategory.Description,
                CreatedAt = dataCategory.CreatedAt
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        //Add details for each category added by admin
        public async Task AddDetailsCategory(AddDetailsDTO detailsCategory)
        {
            var details = new DetailsCategory()
            {
                DetailName = detailsCategory.DetailName,
                CreatedAt = detailsCategory.CreatedAt,
                CategoryId = detailsCategory.CategoryId
            };

            _context.DetailsCategories.Add(details);
            await _context.SaveChangesAsync();
        }

        //Add product by admin
        public async Task AddProduct(AddProductDTO product)
        {
            //var newProduct = new Product()
            //{
            //    ProductName = product.ProductName,
            //    Description = product.Description,
            //    CategoryId = product.CategoryId,
            //    Price = product.Price,
            //    DiscountPercentage = product.DiscountPercentage,
            //    Quantity = product.Quantity,
            //    IsAvaliable = product.IsAvaliable,
            //    Season = product.Season,
            //    CreatedAt = product.CreatedAt,
            //};
            var newProduct = _mapper.Map<Product>(product);

            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();
        }

        //Add Size for product by admin
        public async Task AddSizeProduct(AddSizeDTO size)
        {
            var sizeProd = new Size()
            {
                SizeName = size.SizeName
            };
            _context.Sizes.Add(sizeProd);

            await _context.SaveChangesAsync();
        }

        //Add Payment Type by admin
        public async Task AddPaymentType(string paymentName)
        {
            var paytype = new PaymentType()
            {
                PaymentName = paymentName
            };

            _context.PaymentTypes.Add(paytype);
            await _context.SaveChangesAsync();
        }

        //Add Discount Type by admin
        public async Task AddDiscountType(AddDiscounType discounType)
        {
            var discount = new Discount
            {
                DiscontType = discounType.DiscontType,
                Percentage = discounType.Percentage,
                EndDate = discounType.EndDate
            };

            _context.Discounts.Add(discount);
            await _context.SaveChangesAsync();
        }

        //Add product in favorite by user
        public async Task AddFavorite(AddFavoriteDTO favorite)
        {
            var user = await _context.User.FindAsync(favorite.Id);

            if(user == null)
            {
                throw new ApplicationException("User is not found");
            }

            var product = await _context.Products.Where(x => x.ProductId == favorite.ProductId).FirstOrDefaultAsync();

            if(product == null)
            {
                throw new ApplicationException("Product is not found");
            }

            var newFavorite = new Favorite
            {
                ProductId = product.ProductId,
                UserId = user.Id,
                CreatedAt = favorite.CreatedAt
            };

            _context.Favorites.Add(newFavorite);
            await _context.SaveChangesAsync();
        }

        //Add Order 
        public async Task AddOrder(AddOrder order)
        {
            var userId = await _context.User.Where(u => u.Id == order.UserId).FirstOrDefaultAsync();
            var paymentTypeId = await _context.PaymentTypes.Where(pa => pa.PaymentId == order.PaymentTypeId).FirstOrDefaultAsync();

            //if(order.DiscountId != 0)
            //{
            //    var discountId = await _context.Discounts.Where(d => d.DiscountId == order.DiscountId).FirstOrDefaultAsync();
            //}

            if (userId != null && paymentTypeId != null)
            {
                var newOrder = new Order
                {
                    UserId = order.UserId,
                    OrderDate = order.OrderDate,
                    PaymentId = order.PaymentTypeId,
                    TotalAmount = order.TotalAmount,
                    PaymentStatus = order.PaymentStatus,
                    OrderStatus = order.OrderStatus,
                    ShippingFee = order.ShippingFee,
                    ShippingFree = order.ShippingFree,
                    ShippingType = order.ShippingType,
                    CreatedAt = order.CreatedAt,
                    DiscountId = order.DiscountId
                };

                // Add the order to the database
                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();

                var orderId = newOrder.OrderId;

                foreach (var productOrder in order.products)
                {
                    var prodId = await _context.Products.FindAsync(productOrder.ProductId);

                    if(prodId != null)
                    {
                        var newOrderItem = new OrderItem
                        {
                            OrderId = orderId,
                            ProductId = prodId.ProductId,
                            Quantity = productOrder.Quantity,
                            ItemPrice = productOrder.ItemPrice,
                            SubTotal = productOrder.SubTotal
                        };

                        _context.OrderItems.Add(newOrderItem);
                    }
                }

                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ApplicationException("Invalid user Id or payment Id");
            }
        }

        //Add Review
        public async Task AddReview(AddReviewDTO review)
        {
            var product = await _context.Products.Where(p => p.ProductId == review.ProductId).FirstOrDefaultAsync();
            var user = await _context.User.Where(u => u.Id == review.UserId).FirstOrDefaultAsync();

            if(user != null && product != null)
            {
                var newReview = new ProductReview
                {
                    ProductId = review.ProductId,
                    UserId = review.UserId,
                    Title = review.Title,
                    Description = review.Description,
                    Rating = review.Rating,
                    DateReview = review.DateReview
                };

                _context.ProductReviews.Add(newReview);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new ApplicationException("Invalid user Id or product Id");
            }
        }

        //When admin update category
        public async Task UpdateCategory(int id, UpdateCategory category)
        {
            var UpdateCategory = await _context.Categories.FindAsync(id);

            if(UpdateCategory != null)
            {
                UpdateCategory.CategoryName = category.CategoryName;
                UpdateCategory.Description = category.Description;
                UpdateCategory.UpdatedAt = category.UpdatedAt;
            }
            else
            {
                throw new ApplicationException("Category is not found");
            }

            _context.Categories.Update(UpdateCategory);
            await _context.SaveChangesAsync();
        }

        //When admin update details category
        public async Task UpdateDetailsCategory(int id, UpdateDetailsCategory DeCategory)
        {
            var DetailsCategory = await _context.DetailsCategories.FindAsync(id);

            if(DetailsCategory != null)
            {
                DetailsCategory.DetailName = DetailsCategory.DetailName;
            }
            else
            {
                throw new ApplicationException("Details Category is not found");
            }

            _context.DetailsCategories.Update(DetailsCategory);
            await _context.SaveChangesAsync();
        }

        //When admin update product: is available or Not
        public async Task IsAvailable(int id, bool IsAvailable)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                throw new ApplicationException("Product is not found");
            }
            else
            {
                //if product is not available 
                if (!IsAvailable)
                {
                    product.IsAvaliable = false;
                }
                //if product is available
                else
                {
                    product.IsAvaliable = true;
                }
            }

            await _context.SaveChangesAsync();
        }

        //When admin delete payment type 
        public async Task DeletePaymentType(int id)
        {
            var paymentType = await _context.PaymentTypes.FindAsync(id);

            if(paymentType == null)
            {
                throw new ApplicationException("Payment type is not found");
            }

            _context.PaymentTypes.Remove(paymentType);
            await _context.SaveChangesAsync();
        }

        //Delete image for product by admin
        public async Task DeleteImage(int id)
        {
            var imgProduct = await _context.Images.FindAsync(id);

            if(imgProduct == null)
            {
                throw new ApplicationException("Image is not found");
            }

            _context.Images.Remove(imgProduct);
            await _context.SaveChangesAsync();
        }

        //Delete size for product
        public async Task DeleteSize(int id)
        {
            var sizeProd = await _context.Sizes.FindAsync(id);

            if (sizeProd == null)
            {
                throw new ApplicationException("Size is not found");
            }

            _context.Sizes.Remove(sizeProd);
            await _context.SaveChangesAsync();
        }
    }
}
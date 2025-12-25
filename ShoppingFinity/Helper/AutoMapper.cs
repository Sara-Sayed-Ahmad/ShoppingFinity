using AutoMapper;
using ShoppingFinity.Migrations;
using ShoppingFinity.Model;
using ShoppingFinity.Model.AddDTOs;
using ShoppingFinity.Model.DTOs;
using ShoppingFinity.Model.GetDTOs;

namespace ShoppingFinity.Helper
{
    public class AutoMapper :Profile
    {
        public AutoMapper() 
        {
            //User -> UserDTO
            CreateMap<User, UserDTO>().ReverseMap();

            //Category -> CategoryDTO
            CreateMap<Category, CategoryDTO>().ReverseMap();

            //DetailsCategory -> DetailsCategoryDTO
            CreateMap<DetailsCategory, DetailsCategoryDTO>().ReverseMap();

            //Favorite -> FavoriteDTO
            CreateMap<Favorite, FavoriteDTO>().ReverseMap();

            //Discount -> DiscountDTO
            CreateMap<Discount, DiscountDTO>().ReverseMap();

            //Images -> ImagesDTO
            CreateMap<Images, ImagesDTO>().ReverseMap();

            //Order -> OrderDTO
            CreateMap<Order, OrderDTO>().ReverseMap();

            //OrderItem -> OrderItemDTO
            CreateMap<OrderItem, OrderItemDTO>().ReverseMap();

            //PaymentType -> PaymentTypeDTO
            CreateMap<PaymentType, PaymentTypeDTO>().ReverseMap();

            //PaymentTypeUser -> PaymentTypeUserDTO
            CreateMap<PaymentTypeUser, PaymentTypeUserDTO>().ReverseMap();

            //Product -> ProductDTO
            CreateMap<Product, ProductDTo>().ReverseMap();

            //ProductReview -> ProductReviewDTO
            CreateMap<ProductReview, ProductReviewDTO>().ReverseMap();

            //SizeProduct -> SizeProductDTO
            CreateMap<ProductSize, ProductSizeDTO>().ReverseMap();

            //Transaction -> TransactionDTO
            CreateMap<Transaction, TransactionDTO>().ReverseMap();

            //ProductCategory -> ProductCategoryDTO
            CreateMap<ProductCategory, ProductCategoryDTO>().ReverseMap();

            //Product -> AddProduct
            CreateMap<AddProductDTO, Product>().ForMember(dest => dest.ProductCategories, opt => opt.MapFrom(src => src.DetailsId.Select(id => new ProductCategory { DetailsId = id })));
        }
    }
}
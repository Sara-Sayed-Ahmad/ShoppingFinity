namespace ShoppingFinity.Model.GetDTOs
{
    public class ProductDTo
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        public float Price { get; set; }

        public int Quantity { get; set; }

        public bool IsAvaliable { get; set; }

        public int CountOrder { get; set; }

        public string Season { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public List<FavoriteDTO> Favorites { get; set; }

        public List<OrderItemDTO> OrderItems { get; set; }

        public List<ImagesDTO> Images { get; set; }

        public List<ProductSizeDTO> ProductSizes { get; set; }

        public List<ProductReviewDTO> ProductReviews { get; set; }

        public List<ProductCategoryDTO> ProductCategories { get; set; }
    }
}
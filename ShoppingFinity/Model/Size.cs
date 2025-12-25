using System.ComponentModel.DataAnnotations;

namespace ShoppingFinity.Model
{
    public class Size
    {
        [Key]
        public int SizeId { get; set; }

        public string SizeName { get; set; }

        public ICollection<Product> Products { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; }

        public List<ProductSize> ProductSizes { get; set; }
    }
}
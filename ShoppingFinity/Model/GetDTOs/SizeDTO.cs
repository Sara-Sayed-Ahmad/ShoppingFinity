namespace ShoppingFinity.Model.GetDTOs
{
    public class SizeDTO
    {
        public int SizeId { get; set; }

        public string SizeName { get; set; }

        public List<ProductSizeDTO> ProductSizes { get; set; }
    }
}

namespace ShoppingFinity.Model
{
    public class OrderItem
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int SizeId { get; set; }
        public Size Size { get; set; }

        public int Quantity { get; set; }

        public float ItemPrice { get; set; }

        public float SubTotal { get; set; }
    }
}
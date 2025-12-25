using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShoppingFinity.Model;

namespace ShoppingFinity
{
    public class SystemDbContext : IdentityDbContext<User>
    {
        //public SystemDbContext() : base() { }
        public SystemDbContext(DbContextOptions<SystemDbContext> options) : base(options)
        {
            Database.EnsureCreated(); 
        }

        public DbSet<User> User { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Images> Images { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<DetailsCategory> DetailsCategories { get; set; }
        public DbSet<ProductCategory> productCategories { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<PaymentType> PaymentTypes { get; set; }
        public DbSet<PaymentTypeUser> PaymentTypeUsers { get; set; }
        public DbSet<ProductReview> ProductReviews { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Properties for Entity (Fluent API)

            //tb.1 Users
            modelBuilder.Entity<User>(u =>
            {
                u.Property(u => u.FirstName).HasColumnType("varchar(50)").IsRequired();
                u.Property(u => u.LastName).HasColumnType("varchar(50)").IsRequired();
                u.Property(u => u.Address).HasColumnType("varchar(100)");
                u.Property(u => u.City).HasColumnType("varchar(50)");
                u.Property(u => u.Country).HasColumnType("varchar(50)");
                u.Property(u => u.ZipCode).HasColumnType("varchar(50)");
                u.Property(u => u.Governorate).HasColumnType("varchar(100)");
                u.Property(u => u.StreetNum).HasDefaultValue(0);
                u.Property(u => u.ApartmentNum).HasDefaultValue(0);
                u.Property(u => u.AuthenticationToken).HasColumnType("varchar(550)").IsRequired();
                u.Property(u => u.LastLoginDate).HasDefaultValueSql("GETDATE()");
                u.Property(u => u.IsAdmin).HasColumnType("bit");
            });

            //tb.2 Products 
            modelBuilder.Entity<Product>(p =>
            {
                p.Property(p => p.ProductName).HasColumnType("varchar(400)").IsRequired();
                p.Property(p => p.Description).HasColumnType("varchar(550)").IsRequired();
                p.Property(p => p.Price).HasColumnType("float").IsRequired();
                p.Property(p => p.IsAvaliable).HasColumnType("bit").IsRequired();
                p.Property(p => p.Quantity).HasDefaultValue(1).IsRequired();
                p.Property(p => p.CountOrder).HasDefaultValue(0);
                p.Property(p => p.Season).HasColumnType("varchar(50)").IsRequired();
                p.Property(p => p.CreatedAt).HasDefaultValueSql("CONVERT(DATE, GETDATE())");
            });

            //tb.3 Orders
            modelBuilder.Entity<Order>(o =>
            {
                o.Property(o => o.OrderDate).HasDefaultValueSql("CONVERT(DATE, GETDATE())").IsRequired();
                o.Property(o => o.PaymentStatus).HasColumnType("varchar(50)").IsRequired();
                o.Property(o => o.OrderStatus).HasColumnType("varchar(50)").IsRequired();
                o.Property(o => o.ShippingType).HasColumnType("varchar(50)").IsRequired();
                o.Property(o => o.ShippingFee).HasColumnType("float").HasDefaultValue(0.0);
                o.Property(o => o.ShippingFree).HasColumnType("bit").HasDefaultValue(false);
                o.Property(o => o.TotalAmount).HasColumnType("float");
                //o.Property(o => o.TrackingNum).ValueGeneratedOnAdd();
                o.Property(o => o.CreatedAt).HasDefaultValueSql("CONVERT(DATE, GETDATE())");
            });

            //tb.5 Images
            modelBuilder.Entity<Images>(img =>
            {
                img.Property(img => img.ImageName).HasColumnType("varchar(150)").IsRequired();
                img.Property(img => img.Color).HasColumnType("varchar(50)").IsRequired();
                img.Property(img => img.CreatedAt).HasDefaultValueSql("CONVERT(DATE, GETDATE())").IsRequired();
            });

            //tb.6 Category 
            modelBuilder.Entity<Category>(c =>
            {
                c.Property(c => c.CategoryName).HasColumnType("varchar(100)").IsRequired();
                c.Property(c => c.Description).HasColumnType("varchar(550)").IsRequired();
                c.Property(c => c.CreatedAt).HasDefaultValueSql("CONVERT(DATE, GETDATE())");
            });

            //tb.7 DetailsCategory
            modelBuilder.Entity<DetailsCategory>(dc =>
            {
                dc.Property(dc => dc.DetailName).HasColumnType("varchar(100)").IsRequired();
                dc.Property(dc => dc.CreatedAt).HasDefaultValueSql("CONVERT(DATE, GETDATE())");
            });

            //tb.8 ProductReview
            modelBuilder.Entity<ProductReview>(pr =>
            {
                pr.Property(pr => pr.DateReview).HasDefaultValueSql("CONVERT(DATE, GETDATE())");
                pr.Property(pr => pr.Title).HasColumnType("varchar(50)").IsRequired();
                pr.Property(pr => pr.Description).HasColumnType("varchar(550)").IsRequired();
                pr.Property(pr => pr.Rating).HasDefaultValue(0);

            });

            //tb.9 Discount
            modelBuilder.Entity<Discount>(di =>
            {
                di.Property(di => di.DiscontType).HasColumnType("varchar(50)").IsRequired();
                di.Property(di => di.EndDate).HasDefaultValueSql("CONVERT(DATE, GETDATE())");
                di.Property(di => di.Percentage).HasColumnType("float");
            });

            //tb.10 PaymentType
            modelBuilder.Entity<PaymentType>(pa =>
            {
                pa.Property(pa => pa.PaymentName).HasColumnType("varchar(50)");
                pa.Property(pa => pa.CountNumberOrder).HasDefaultValue(0);
            });
           
            //tb.11 Transaction
            modelBuilder.Entity<Transaction>(tr =>
            {
                tr.Property(tr => tr.TransactionDate).IsRequired();
            });

            //Relations between tables

            //RT.1 User and Product: many to many
            modelBuilder.Entity<User>()
                .HasMany(p => p.Products)
                .WithMany(u => u.Users)
                .UsingEntity<Favorite>(
                    f => f
                        .HasOne(p => p.Product)
                        .WithMany(fa => fa.Favorites)
                        .HasForeignKey(fp => fp.ProductId),
                    f => f
                        .HasOne(u => u.User)
                        .WithMany(fa => fa.Favorites)
                        .HasForeignKey(fa => fa.UserId),
                    //.OnDelete(DeleteBehavior.ClientCascade),
                    f =>
                    {
                        f.Property(fav => fav.CreatedAt).HasDefaultValueSql("CONVERT(DATE, GETDATE())");
                        f.HasKey(fav => new { fav.UserId, fav.ProductId });
                    }
            );

            //RT.2 User and PaymentType: many to many
            modelBuilder.Entity<User>()
                .HasMany(pa => pa.PaymentType)
                .WithMany(u => u.Users)
                .UsingEntity<PaymentTypeUser>(
                    pau => pau
                        .HasOne(p => p.PaymentType)
                        .WithMany(pay => pay.PaymentTypeUsers)
                        .HasForeignKey(payp => payp.PaymentId),
                    pau => pau
                        .HasOne(u => u.User)
                        .WithMany(pay => pay.PaymentTypeUsers)
                        .HasForeignKey(payUs => payUs.UserId),
                    pau =>
                    {
                        pau.HasKey(p => new { p.UserId, p.PaymentId });
                    }
            );

            //RT.3 User and ProductReview: one to many
            modelBuilder.Entity<ProductReview>()
                .HasOne(u => u.User)
                .WithMany(pr => pr.ProductReviews);

            //RT.4 Discount and Order: one to many
            modelBuilder.Entity<Order>()
                .HasOne(d => d.Discount)
                .WithMany(or => or.Orders);

            //RT.5 User and Order: one to many
            modelBuilder.Entity<Order>()
                .HasOne(u => u.User)
                .WithMany(o => o.Orders);

            //RT.6 User and Transaction: one to many
            modelBuilder.Entity<Transaction>()
                .HasOne(u => u.User)
                .WithMany(tr => tr.Transactions);

            //RT.7 Product and Order: many to many
            modelBuilder.Entity<Product>()
                .HasMany(o => o.Orders)
                .WithMany(p => p.Products)
                .UsingEntity<OrderItem>(
                    or => or
                        .HasOne(o => o.Order)
                        .WithMany(or => or.OrderItems)
                        .HasForeignKey(ord => ord.OrderId),
                    or => or
                        .HasOne(p => p.Product)
                        .WithMany(or => or.OrderItems)
                        .HasForeignKey(ord => ord.ProductId),
                    or =>
                    {
                        or.Property(or => or.ItemPrice).HasColumnType("float").IsRequired();
                        or.Property(or => or.SubTotal).HasColumnType("float").IsRequired();
                        or.Property(or => or.Quantity).IsRequired();
                        or.HasKey(ord => new { ord.ProductId, ord.OrderId });
                    }
            );

            //RT.8 Payment Type and Order: one to many
            modelBuilder.Entity<Order>()
                .HasOne(p => p.PaymentType)
                .WithMany(o => o.Orders)
                .HasForeignKey(p => p.PaymentId);

            //modelBuilder.Entity<Product>()
            //    .HasMany(c => c.Carts)
            //    .WithMany(p => p.Products)
            //    .UsingEntity<CartItem>(
            //        ca => ca
            //            .HasOne(c => c.Cart)
            //            .WithMany(ca => ca.CartItems)
            //            .HasForeignKey(cai => cai.CartId),
            //        ca => ca
            //            .HasOne(p => p.Product)
            //            .WithMany(ca => ca.CartItems)
            //            .HasForeignKey(cai => cai.ProductId),
            //        ca =>
            //        {
            //            ca.Property(ca => ca.Quantity).HasDefaultValue(0);
            //            ca.Property(ca => ca.ItemPrice).HasColumnType("float").IsRequired();
            //            ca.Property(ca => ca.SubTotal).HasColumnType("float").IsRequired();
            //            ca.HasKey(cai => new { cai.ProductId, cai.CartId });
            //        }
            // );

            //RT.9 Product and Image: one to many
            modelBuilder.Entity<Images>()
                .HasOne(p => p.Product)
                .WithMany(img => img.Images);

            //RT.10 Product and Size: many to many
            modelBuilder.Entity<Product>()
               .HasMany(s => s.Sizes)
               .WithMany(p => p.Products)
               .UsingEntity<ProductSize>(
                   ps => ps
                         .HasOne(s => s.Size)
                         .WithMany(p => p.ProductSizes)
                         .HasForeignKey(ps => ps.SizeId),
                   ps => ps
                         .HasOne(p => p.Product)
                         .WithMany(s => s.ProductSizes)
                         .HasForeignKey(sp => sp.ProductId),
                    ps =>
                    {
                        ps.HasKey(p => new { p.ProductId, p.SizeId });
                    }
               );

            //RT.11 Product and ProductReview: one to many
            modelBuilder.Entity<ProductReview>()
                .HasOne(p => p.Product)
                .WithMany(pr => pr.ProductReviews);

            //RT.12 Order and Transaction: One to many
            modelBuilder.Entity<Transaction>()
                .HasOne(o => o.Order)
                .WithMany(tr => tr.Transactions)
                .OnDelete(DeleteBehavior.ClientCascade);

            //RT.13 Category and Product: one to many
            modelBuilder.Entity<Product>()
                .HasOne(ca => ca.Category)
                .WithMany(p => p.Products);

            //RT.14 Category and DetailsCategory: one to many
            modelBuilder.Entity<DetailsCategory>()
                .HasOne(c => c.Category)
                .WithMany(dc => dc.DetailsCategories);

            //RT.15 Product and DetailsCategory: many to many
            modelBuilder.Entity<Product>()
                .HasMany(dc => dc.DetailsCategories)
                .WithMany(p => p.Products)
                .UsingEntity<ProductCategory>(
                    pd => pd
                        .HasOne(de => de.DetailsCategory)
                        .WithMany(pr => pr.ProductCategories)
                        .HasForeignKey(dp => dp.DetailsId),
                    pd => pd
                        .HasOne(p => p.Product)
                        .WithMany(pc => pc.ProductCategories)
                        .HasForeignKey(pro => pro.ProductId)
                        .OnDelete(DeleteBehavior.Restrict),
                    pd =>
                            {
                                pd.HasKey(pdc => new { pdc.ProductId, pdc.DetailsId });
                            }
                    );
            //RT.16 Size and OrderItem: one to many
            modelBuilder.Entity<OrderItem>()
                .HasOne(s => s.Size)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(so => so.SizeId);
        }
    }
}
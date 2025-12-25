using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingFinity.Model;
using ShoppingFinity.Model.AddDTOs;
using ShoppingFinity.Model.UpdateDTOs;
using ShoppingFinity.Repository;
using ShoppingFinity.Repository.Image;

namespace ShoppingFinity.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ShoppingIRepository _Repository;
        private readonly IFileImages _images;

        public AdminController(ShoppingIRepository repository, IFileImages images)
        {
            _Repository = repository;
            _images = images;
        }

        //Authorized opertations for admin: 

        //Add category
        [HttpPost("AddCategory")]
        public async Task<IActionResult> AddCategory([FromBody] AddCategoryDTO category)
        {
            await _Repository.AddCategories(category);

            return Ok("Category is Added");
        }

        //Add details for category by admin
        [HttpPost("AddDetailsCategory")]
        public  async Task<IActionResult> AddDetails([FromBody] AddDetailsDTO details)
        {
            await _Repository.AddDetailsCategory(details);

            return Ok("Details category is Added");
        }

        //Add Product 
        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] AddProductDTO prod)
        {
            await _Repository.AddProduct(prod);

            return Ok("Product added successfully");
        }

        [HttpPost("UpoladImage")] 
        public async Task<IActionResult> Uploadimg([FromForm] AddImageDTO image)
        {
            var img = await _images.UploadImage(image);

            if(img == null)
                NotFound();
            return Ok(img);
        }

        //Add Size for product
        [HttpPost("AddSizeProduct")]
        public async Task<IActionResult> AddSize([FromBody] AddSizeDTO size)
        {
            await _Repository.AddSizeProduct(size);

            return Ok("Size added successfully");
        }

        //Add payment Type 
        [HttpPost("AddPaymentType")]
        public async Task<IActionResult> AddPaymentType(string paymentName)
        {
            await _Repository.AddPaymentType(paymentName);

            return Ok("Payment Type is added");
        }

        //Add Discount Type
        [HttpPost("AddDiscountType")]
        public async Task<IActionResult> AddDiscountType(AddDiscounType disc)
        {
            await _Repository.AddDiscountType(disc);

            return Ok("Discount Type is added");
        }

        //Update Category
        [HttpPut("UpdateCategory{id}")]
        public async Task<IActionResult> UpdateCategories([FromRoute]int id, [FromBody] UpdateCategory category)
        {
            await _Repository.UpdateCategory(id, category);

            return Ok("Category is updated");
        }

        //Update Details Category
        [HttpPut("UpdateDetailsCategory{id}")]
        public async Task<IActionResult> UpdateDetailsCateg([FromRoute] int id, [FromBody] UpdateDetailsCategory detailsCategory)
        {
            await _Repository.UpdateDetailsCategory(id, detailsCategory);

            return Ok("Details Category is updated");
        }

        //Update product(available)
        [HttpPost("IsAvailable{id}")]
        public async Task<IActionResult> IsAvailable([FromRoute] int id, [FromForm] bool IsAvailable)
        {
            await _Repository.IsAvailable(id, IsAvailable);

            return Ok("Product is Updated");
        }

        //Delete payment type
        [HttpDelete("DeletePaymentType")]
        public async Task<IActionResult> DeletePaymentType(int id)
        {
            await _Repository.DeletePaymentType(id);

            return Ok("Payment Type is deleted");
        }

        //Delete image product
        [HttpDelete("DeleteImage")]
        public async Task<IActionResult> DeleteImageProduct(int id)
        {
            await _Repository.DeleteImage(id);

            return Ok("Image is deleted");
        }

        //Delete size product
        [HttpDelete("DeleteSize")]
        public async Task<IActionResult> DeleteSizeProduct(int id)
        {
            await _Repository.DeleteSize(id);

            return Ok("Size is deleted");
        }
    }
}
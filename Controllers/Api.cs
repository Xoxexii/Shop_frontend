namespace shop.Controllers
{
    public class Api
    {
        public string Name { get; set; }
        public int Pass { get; set; }
        public Api(string user , int pass) { 
            this.Name = user;
            this.Pass = pass;
        }
    }
}

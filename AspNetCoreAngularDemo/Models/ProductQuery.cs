using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreAngularDemo.Models
{
    public class ProductQuery
    {
        public string Name { get; set; }
        public string SortBy { get; set; }
        public bool SortAscending { get; set; }
        public int Page { get; set; }
        public byte PageSize { get; set; }
    }
}

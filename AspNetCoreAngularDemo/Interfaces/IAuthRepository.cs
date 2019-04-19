using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreAngularDemo.Interfaces
{
    public interface IAuthRepository
    {
        object Authenticate(string username, string password);
    }
}

using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using System;
using AutoMapper;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly IAuthRespository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRespository repo, IConfiguration config,
     
        IMapper mapper)
        {
            _mapper = mapper;
            _config = config;
            _repo = repo;

        }
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
    {
        userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

        if (await _repo.UserExists(userForRegisterDto.Username))
            return BadRequest("Username already exists");

        var userToCreate = _mapper.Map<User>(userForRegisterDto); // the parameter is the source

        var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

        var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);

        return CreatedAtRoute("GetUser",  new {controller = "Users",
         id = createdUser.Id}, userToReturn);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
    {
        var userFromRep = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

        if (userFromRep == null)
            return Unauthorized();

        var claims = new[]
        {
                new Claim(ClaimTypes.NameIdentifier, userFromRep.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRep.Username)
            };

        var key = new SymmetricSecurityKey(Encoding.UTF8
        .GetBytes(_config.GetSection("AppSettings:Token").Value));


        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        var user = _mapper.Map<UserForListDto>(userFromRep);

        return Ok(new
        {
            token = tokenHandler.WriteToken(token), user
        });
    }
}
}
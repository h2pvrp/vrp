using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VrpBackend.Models;


namespace VrpBackend.EntityFramework
{
    public class WebApiContext : DbContext
    {
        public WebApiContext(DbContextOptions<WebApiContext> options) : base(options) { }
        
        public DbSet<Case> Cases { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Worker> Workers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.HasPostgresExtension("postgis");

            builder.Entity<Worker>()
                    .HasIndex(u => u.Name)
                    .IsUnique();
        }
    }
}

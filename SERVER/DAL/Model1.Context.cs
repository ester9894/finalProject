﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ProjectDBEntities : DbContext
    {
        public ProjectDBEntities()
            : base("name=ProjectDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Frequency> Frequencies { get; set; }
        public virtual DbSet<List> Lists { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductsToTypeList> ProductsToTypeLists { get; set; }
        public virtual DbSet<TypesList> TypesLists { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UsersAccount> UsersAccounts { get; set; }
        public virtual DbSet<FollowUpList> FollowUpLists { get; set; }
        public virtual DbSet<ProductToList> ProductToLists { get; set; }
        public virtual DbSet<Alert> Alerts { get; set; }
    }
}

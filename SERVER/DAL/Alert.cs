//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class Alert
    {
        public long AlertId { get; set; }
        public System.DateTime Date { get; set; }
        public bool IsActivated { get; set; }
        public long FollowUpListId { get; set; }
        public Nullable<long> ProductId { get; set; }
        public long Days { get; set; }
    
        public virtual FollowUpList FollowUpList { get; set; }
        public virtual Product Product { get; set; }
    }
}

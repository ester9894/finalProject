
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
    
public partial class Frequency
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public Frequency()
    {

        this.FollowUpLists = new HashSet<FollowUpList>();

    }


    public long FrequencyId { get; set; }

    public string FrequencyMode { get; set; }

    public int NumDays { get; set; }

    public int Exception { get; set; }



    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<FollowUpList> FollowUpLists { get; set; }

}

}

document.addEventListener("DOMContentLoaded",()=> {

        // Form page
const form = document.getElementById("detailForm");
if(form){

form.addEventListener("submit",(e)=> {
        e.preventDefault();
        
        try{
        const name=document.getElementById("name").value.trim();
        const age=parseInt(document.getElementById("age").value) || 0;
        const area=document.getElementById("area").value;
        const gender=document.querySelector('input[name="gender"]:checked')?.value || "";
        const status=document.querySelector('input[name="status"]:checked')?.value || "";

        // Validation
        if(!name)throw new Error("Name is required.");
         if(!area)throw new Error("Area is required.");
          if(age <= 0)throw new Error("Enter valid age.");

        //Allocate district
        let district="";
        switch(area){
            case "Donholm":district= "Shalom";break;
            case "Pipeline":district= "Upendo";break;
            case "Nyayo":district= "Jerusalem";break;
            default: district="Not allocated"
        }


        //Allocate category
        let category="";
        if(age <= 12) category="Kids";
        else if(age <= 18) category="Teens";
        else if(age <= 35) category="Youth";
        else category="Adults";

        if(status==="Disabled") category += " (Special Care)";

        //Save to localStorage
        const userData={name,age,area,gender,status,district,category};
        localStorage.setItem("userData",JSON.stringify(userData));

        //Alert for name and area
        alert("Name: " +userData.name);
        alert("Area: " +userData.area);

        //optional:reset form
        form.reset();

        //Redirect to district page
        location.href="About.html";

    }catch(error){
        alert("Error: " + error.message);
        console.error(error);
    }

});

}

    // District page //
    const districtDiv= document.getElementById("district");
    const displayNameDiv= document.getElementById("displayName");

    if(districtDiv||displayNameDiv){
        let userData=null;
        try{
            userData=JSON.parse(localStorage.getItem("userData"));
        }catch(error){
            console.error("Error reading user data:",error);
        }

        if(userData){
            if(districtDiv) districtDiv.textContent=userData.district;
            if(displayNameDiv) displayNameDiv.textContent= userData.name;
        }else{
            if(districtDiv) districtDiv.textContent="No data found.Please fill the form first.";
            if(displayNameDiv)displayNameDiv.textContent="";
        }
    }

    // user card
    const categoryDiv=document.querySelector(".get-category");
    if(categoryDiv){

try{let userData=JSON.parse(localStorage.getItem("userData"));
        

        if(userData){
           categoryDiv.innerHTML=`
            <div class="user-card">
    <h2>Member Details</h2>
    <p><strong>Name:</strong>${userData.name}</p>
    <p><strong>Age:</strong>${userData.age}</p>
    <p><strong>Area:</strong>${userData.area}</p>
    <p><strong>District:</strong>${userData.district}</p>
    <p><strong>Gender:</strong>${userData.gender}</p>
    <p><strong>Status:</strong>${userData.status}</p>
    <p><strong>Category:</strong>${userData.category}</p>
</div>
`;
        }else{
    categoryDiv.textContent= "No user data found.Please fill in the form first."
}

 } catch(error){
      console.error(error);
      categoryDiv.textContent=error.message;
  }

    }
 
});
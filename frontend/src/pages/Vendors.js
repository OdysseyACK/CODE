// import { useState, useEffect } from "react";
// import axios from "axios";
// import Vendor from "../components/Vendor";
// import { getError } from "../utils";
// import {
//   MDBTabs,
//   MDBTabsItem,
//   MDBTabsContent,
//   MDBTabsPane,
//   MDBRow,
//   MDBCol,
// } from "mdb-react-ui-kit";

// function Vendors() {
//   const [vendors, setVendors] = useState([]);
//   const [activeTab, setActiveTab] = useState("Artiste");

//   useEffect(() => {
//     axios
//       .get(`/api/users/vendors`)
//       .then((response) => {
//         setVendors(response.data.filter((vendor) => vendor.isActive));
//       })
//       .catch((error) => {
//         console.log(error);
//         console.log(getError(error));
//       });
//   }, []);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const filteredVendors = vendors.filter(
//     (vendor) => vendor.vendorType === activeTab
//   );

//   return (
//     <div>
//       <div>
//         <section className="vendors">
//           <div className="vendors-tabs">
//             <MDBTabs>
//               {[
//                 "Artiste",
//                 "Catering",
//                 "Decor",
//                 "Florist",
//                 "Photography",
//                 "Organiser",
//                 "Venue",
//                 "Others",
//               ].map((tab) => (
//                 <div className="qwe123">
//                   <MDBTabsItem
//                     key={tab}
//                     onClick={() => handleTabClick(tab)}
//                     active={activeTab === tab}
//                   >
//                     <div className="vendor-tab">{tab}</div>
//                   </MDBTabsItem>
//                 </div>
//               ))}
//             </MDBTabs>
//           </div>

//           <MDBTabsContent>
//             <MDBTabsPane show={activeTab === "Artiste"}>
//               <MDBRow>
//                 {filteredVendors.map((vendor) => (
//                   <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
//                     <Vendor user={vendor} />
//                   </MDBCol>
//                 ))}
//               </MDBRow>
//             </MDBTabsPane>
//             <MDBTabsPane show={activeTab === "Catering"}>
//               <MDBRow>
//                 {filteredVendors.map((vendor) => (
//                   <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
//                     <Vendor user={vendor} />
//                   </MDBCol>
//                 ))}
//               </MDBRow>
//             </MDBTabsPane>
//             <MDBTabsPane show={activeTab === "Decor"}>
//               <MDBRow>
//                 {filteredVendors.map((vendor) => (
//                   <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
//                     <Vendor user={vendor} />
//                   </MDBCol>
//                 ))}
//               </MDBRow>
//             </MDBTabsPane>
//             <MDBTabsPane show={activeTab === "Florist"}>
//               <MDBRow>
//                 {filteredVendors.map((vendor) => (
//                   <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
//                     <Vendor user={vendor} />
//                   </MDBCol>
//                 ))}
//               </MDBRow>
//             </MDBTabsPane>
//             <MDBTabsPane show={activeTab === "Photography"}>
//               <MDBRow>
//                 {filteredVendors.map((vendor) => (
//                   <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
//                     <Vendor user={vendor} />
//                   </MDBCol>
//                 ))}
//               </MDBRow>
//             </MDBTabsPane>
//             <MDBTabsPane show={activeTab === "Organiser"}>
//               <MDBRow>
//                 {filteredVendors.map((vendor) => (
//                   <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
//                     <Vendor user={vendor} />
//                   </MDBCol>
//                 ))}
//               </MDBRow>
//             </MDBTabsPane>
//             <MDBTabsPane show={activeTab === "Venue"}>
//               <MDBRow>
//                 {filteredVendors.map((vendor) => (
//                   <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
//                     <Vendor user={vendor} />
//                   </MDBCol>
//                 ))}
//               </MDBRow>
//             </MDBTabsPane>
//             <MDBTabsPane show={activeTab === "Others"}>
//               <MDBRow>
//                 {filteredVendors.map((vendor) => (
//                   <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
//                     <Vendor user={vendor} />
//                   </MDBCol>
//                 ))}
//               </MDBRow>
//             </MDBTabsPane>
//           </MDBTabsContent>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Vendors;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Vendor from "../components/Vendor";
// import { getError } from "../utils";

// function Vendors() {
//   const [vendors, setVendors] = useState([]);
//   const [activeTab, setActiveTab] = useState("Artiste");

//   useEffect(() => {
//     axios
//       .get(`/api/users/vendors`)
//       .then((response) => {
//         setVendors(response.data.filter((vendor) => vendor.isActive));
//       })
//       .catch((error) => {
//         console.log(error);
//         console.log(getError(error));
//       });
//   }, []);

//   return (
//     <div>
//       <section className="vendors">
//         <div className="vendors-tabs">
//           <div className="tab">Artiste</div>
//           <div className="tab"> Catering</div>
//           <div className="tab">Decor</div>
//           <div className="tab">Florist</div>
//           <div className="tab">Photography</div>
//           <div className="tab">Venue</div>
//           <div className="tab">Others</div>
//         </div>

//         <div className="tab-content">
//           <Vendor />
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Vendors;

import { useState, useEffect } from "react";
import axios from "axios";
import Vendor from "../components/Vendor";
import { getError } from "../utils";
import Footer from "../components/Footer";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [activeTab, setActiveTab] = useState("Artiste");

  useEffect(() => {
    axios
      .get(`/api/users/vendors`)
      .then((response) => {
        setVendors(response.data.filter((vendor) => vendor.isActive));
      })
      .catch((error) => {
        console.log(error);
        console.log(getError(error));
      });
  }, []);

  const handleTabClick = (vendorType) => {
    setActiveTab(vendorType);
  };

  const filteredVendors = vendors.filter(
    (vendor) => vendor.vendorType === activeTab
  );

  return (
    <div>
      <section className="vendors">
        <div className="tab-container">
          {[
            "Artiste",
            "Catering",
            "Decor",
            "Florist",
            "Photography",
            "Organiser",
            "Venue",
            "Others",
          ].map((tab) => (
            <div
              key={tab}
              className="vendor-tab"
              onClick={() => handleTabClick(tab)}
            >
              <div class="tools">
                <div class="circle">
                  <span class="red box"></span>
                </div>
                <div class="circle">
                  <span class="yellow box"></span>
                </div>
                <div class="circle">
                  <span class="green box"></span>
                </div>
              </div>
              {tab}
            </div>
          ))}
        </div>

        <div className="content-container">
          {filteredVendors.map((vendor) => (
            <Vendor key={vendor._id} user={vendor} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Vendors;

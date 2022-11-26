import React from "react";

const handleButtonClick = () => {
		
    console.log('clicked');
};


export const columns = [
{
    name: "Product Name",
    selector: "productname",
    sortable: true,
    grow: 4,
    wrap: true,
},
{
    name: "Type",
    selector: "type",
    sortable: true,
    wrap: true,
},
{
    name: "Sub Type",
    selector: "subtype",
    sortable: true,
    grow: 3,
    wrap: true,
},
{
    name: "Tag Number",
    selector: "tagnumber",
    sortable: true,
    wrap: true,
    
},
{
    cell: () => <button onClick={handleButtonClick}>Add to Cart</button>,
	ignoreRowClick: true,
	allowOverflow: true,
	button: true,
    grow: 0.5
},
{
    cell: () => <button onClick={handleButtonClick}>Delete</button>,
	ignoreRowClick: true,
	allowOverflow: true,
	button: true,
    grow: 0.5
},
{
    cell: () => <button onClick={handleButtonClick}>Update</button>,
	ignoreRowClick: true,
	allowOverflow: true,
	button: true,
    grow: 0.5
}
];

export const data = [
    {
    id: 1,
    productname: "TESTICULAR MODEL #1",
    type: "Task Trainer",
    subtype: "Skills Trainer - Male Genitalia",
    tagnumber: "208382"
    },
    {
    id: 2,
    productname: "GERI KERI NURSING SKILLS 1",
    type: "Patient Simulator",
    subtype: "Low Fidelity",
    tagnumber: ""
    },
    {
    id: 3,
    productname: "CAREASSIST BED W/5TH WHEEL STEERING",
    type: "Medical Furniture",
    subtype: "Bed - MedSurg",
    tagnumber: ""
    },
    {
    id: 4,
    productname: "DOUBLE 2 ROBOT #1",
    type: "Electronics",
    subtype: "System",
    tagnumber: ""
    },
    {
    id: 5,
    productname: "ENTERAL FEEDING PUMP, ROSS PATROL #1",
    type: "Simulation Equipment",
    subtype: "Feeding Pumps",
    tagnumber: ""
    },
    {
    id: 6,
    productname: "EYE MODELS #1 (AR303)",
    type: "Task Trainer",
    subtype: "Skills Trainer - Eye Examination",
    tagnumber: "SHF1065"
    },
    {
    id: 7,
    productname: "Newborn Baby Training Model #3, swaddling baby",
    type: "Task Trainer",
    subtype: "OB/GYN Trainer",
    tagnumber: ""
    },
    {
    id: 8,
    productname: "LAERDAL SIMBABY INFANT SIMULATOR  246-00050 (SimBaby #1)",
    type: "Patient Simulator",
    subtype: "Infant - High Fidelity",
    tagnumber: "084968"
    },
    {
    id: 9,
    productname: "DEFIBRILLATOR, LIFEPAK 20 (Defibrillator #1)",
    type: "Simulation Equipment",
    subtype: "Critical Care",
    tagnumber: "86140"
    },
    {
    id: 10,
    productname: "PROJECTOR, NEC XGA 3500LU, NP1000",
    type: "Electronics",
    subtype: "Projector",
    tagnumber: "87106"
    },
    {
    id: 11,
    productname: "LATITUDE 80",
    type: "Medical Furniture",
    subtype: "Headwall",
    tagnumber: "92605"
    },
    {
    id: 12,
    productname: "SIM (-MAN, -MOM, -BABY) ESSENTIAL MANIKINS AND ACCESSORIES (SimJunior #5), CAUCASIAN",
    type: "Patient Simulator",
    subtype: "Adult - High Fidelity",
    tagnumber: "115843"
    },
    {
    id: 13,
    productname: "LAPTOP DELL LATITUDE 7400",
    type: "Electronics",
    subtype: "Laptop",
    tagnumber: "129506"
    },
    {
    id: 14,
    productname: "PYXIS MEDSTATION 4000 4 DRAWER (Pyxis Medstation #4)",
    type: "Simulation Equipment",
    subtype: "Pyxis",
    tagnumber: "121286"
    },
    {
    id: 15,
    productname: "TABLET LENOVO X103F  (for Blood Pressure Assessment Simulator #2)",
    type: "Electronics",
    subtype: "Tablet",
    tagnumber: "124713"
    }
];
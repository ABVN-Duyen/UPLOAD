using app.interactions from '../db/interactions';
service CatalogService {

 entity Interactions_Header
    as projection on interactions.Interactions_Header;

 entity Header
    as projection on interactions.Header;
 entity Items
    as projection on interactions.Items;
 entity Interactions_Items
    as projection on  interactions.Interactions_Items;

 entity ESG_MEASURE_MASTER 
   as projection on interactions.ESG_MEASURE_MASTER;
 entity DB_ESG_MANUAL_TRANS
   as projection on interactions.DB_ESG_MANUAL_TRANS;
 action   upload_item(uploadItem : array of CatalogService.DB_ESG_MANUAL_TRANS) returns Boolean;
 action   upload_header(uploadHeader : array of CatalogService.ESG_MEASURE_MASTER) returns Boolean;
 function   delete_header() returns Boolean;
 function   delete_item() returns Boolean;
}
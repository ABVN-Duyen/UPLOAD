// namespace app.interactions;

using {Country} from '@sap/cds/common';

type BusinessKey : String(10);
type SDate       : DateTime;
type LText       : String(1024);

entity app.interactions.Interactions_Header {
  key VAR      : String(200) @title : 'Variable';
      YEARS    : Integer;
      NAME     : String(1000);
      EXP_VAR  : Integer;
      ITEM     : Integer;
      ITEM_DES : String(1000);
      DIREC    : String(100);
      EXCLU    : String(100);
};
entity app.interactions.Header {
  key VAR      : String(30);
      YEARS    : Integer;
      NAME     : String(200);
      EXP_VAR  : Integer;
      ITEM     : Integer;
      ITEM_DES : String(200);
      DIREC    : String(2);
      EXCLU    : String(2);
};
entity app.interactions.Interactions_Items {

  key VAR : String(30);
  key YEARS    : Integer;
      VALUE     : String(200);
};
entity app.interactions.Items {

  key VAR : String(30);
  key YEARS    : Integer;
      VALUE     : String(200);
};

 entity app.interactions.ESG_MEASURE_MASTER {
    key VAR     :	String(100);
    VAR_NAME    :	String(500);
    VAR_NO      :	Integer;
    VAR_ITM_NO  :	Integer;
    VAR_ITM_NAME:	String(500);
    DIRECTION   :	String(1);
    EXCL_FLAG   :	String(1);
    MAJ_CLASS   :	String(500);
    MIN_CLASS   :	String(500);
    SCT_ENTITY  :	String(100);
    MEASURE_ID  :	String(100);
    DIM_ID      :	String(100);
    DIM_VAL     :	String(1000);
    DS_SCT      :	String(500);
    DS_MANUAL   :	String(500);
    STAGG_YEAR_MATRIX: Integer;
    STAGG_YEAR_VRC   : Integer;
    FLAG_MATRIX      : String(1);
    FLAG_VRC         : String(1);
    PERIOD_START     : String(100);
    PERIOD_END       : String(100);

 };
 entity app.interactions.DB_ESG_MANUAL_TRANS {
  key VAR	 : String(100);
  key YEAR : String(100);
  VALUE	   : Decimal(31, 14);
 };

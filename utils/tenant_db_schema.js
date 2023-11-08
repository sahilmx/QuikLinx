const query = `
  
CREATE TYPE public.platform AS ENUM (
  'WEB',
  'ANDROID',
  'IOS',
  'SMS',
  'HELPDESK'
);
CREATE SEQUENCE public.batch_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

  ALTER TABLE public.batch_seq OWNER TO QuikLinx;

  SET default_tablespace = '';
  
  SET default_table_access_method = heap;
  CREATE TABLE public.batch (
    id integer DEFAULT nextval('public.batch_seq'::regclass) NOT NULL,
    b_name character varying(255) NOT NULL,
    b_creation timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.batch OWNER TO QuikLinx;

CREATE TABLE public.categorypoints (
  id integer DEFAULT nextval('public.categorypoints'::regclass) NOT NULL,
  cat_id integer,
  sub_cat_id integer,
  points real,
  status boolean DEFAULT true,
  start_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  end_date timestamp without time zone,
  user_type integer,
  created_by integer,
  created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.categorypoints OWNER TO QuikLinx;

CREATE SEQUENCE public.categorypoints_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;


ALTER TABLE public.categorypoints_seq OWNER TO QuikLinx;

CREATE SEQUENCE public.productcategories_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;


ALTER TABLE public.productcategories_seq OWNER TO QuikLinx;


CREATE TABLE public.productcategories (
id integer DEFAULT nextval('public.productcategories_seq'::regclass) NOT NULL,
categoryname character varying(255) NOT NULL,
creationtime timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.productcategories OWNER TO QuikLinx;

CREATE SEQUENCE public.productpoints_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;


ALTER TABLE public.productpoints_seq OWNER TO QuikLinx;

CREATE TABLE public.productpoints (
id integer DEFAULT nextval('public.productpoints_seq'::regclass) NOT NULL,
cat_id integer,
sub_cat_id integer,
p_id integer,
points real,
status boolean DEFAULT true,
start_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
end_date timestamp without time zone,
user_type integer,
created_by integer,
created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.productpoints OWNER TO QuikLinx;


CREATE SEQUENCE public.products_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;


ALTER TABLE public.products_seq OWNER TO QuikLinx;


CREATE TABLE public.products (
id integer DEFAULT nextval('public.products_seq'::regclass) NOT NULL,
p_name character varying(255) NOT NULL,
p_description character varying(255) DEFAULT NULL::character varying,
p_creation timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP,
p_updateion timestamp(0) without time zone DEFAULT NULL::timestamp without time zone,
productcategories integer NOT NULL,
productsubcategory integer NOT NULL,
qty integer,
modelno character varying(255) DEFAULT NULL::character varying,
qr_type integer
);


ALTER TABLE public.products OWNER TO QuikLinx;

CREATE SEQUENCE public.productsubcategories_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;


ALTER TABLE public.productsubcategories_seq OWNER TO QuikLinx;

CREATE TABLE public.productsubcategories (
id integer DEFAULT nextval('public.productsubcategories_seq'::regclass) NOT NULL,
productcategory integer NOT NULL,
subcategoryname character varying(255) NOT NULL,
creationtime timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.productsubcategories OWNER TO QuikLinx;

CREATE SEQUENCE public.qr_code_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;


ALTER TABLE public.qr_code_seq OWNER TO QuikLinx;

CREATE TABLE public.qr_code (
id integer DEFAULT nextval('public.qr_code_seq'::regclass) NOT NULL,
qr_type integer NOT NULL,
b_id character varying(255) DEFAULT NULL::character varying,
qr_parent_id integer,
qr_creation timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
unique_id character varying(255) NOT NULL,
qrh_id integer NOT NULL,
redeemed boolean DEFAULT false
);


ALTER TABLE public.qr_code OWNER TO QuikLinx;


CREATE SEQUENCE public.qrcode_scan_history_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;


ALTER TABLE public.qrcode_scan_history_seq OWNER TO QuikLinx;


CREATE TABLE public.qrcode_scan_history (
id integer DEFAULT nextval('public.qrcode_scan_history_seq'::regclass) NOT NULL,
user_id integer NOT NULL,
user_type integer NOT NULL,
latitude character varying(30),
longitude character varying(30),
qrcode_id integer NOT NULL,
scan_type integer,
platform public.platform,
name character varying(255) NOT NULL,
created_on timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.qrcode_scan_history OWNER TO QuikLinx;


CREATE SEQUENCE public.qrcodehistory_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;


ALTER TABLE public.qrcodehistory_seq OWNER TO QuikLinx;

CREATE TABLE public.qrcodehistory (
id integer DEFAULT nextval('public.qrcodehistory_seq'::regclass) NOT NULL,
batch_id integer,
qr_count integer,
product_id integer,
creation timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.qrcodehistory OWNER TO QuikLinx;

CREATE TABLE public.users (
id integer NOT NULL,
name character varying(100) NOT NULL,
age integer NOT NULL
);


ALTER TABLE public.users OWNER TO QuikLinx;

CREATE SEQUENCE public.users_id_seq
  AS integer
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO QuikLinx;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
CREATE SEQUENCE public.users_role_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;


ALTER TABLE public.users_role_seq OWNER TO QuikLinx;

CREATE TABLE public.users_role (
id integer DEFAULT nextval('public.users_role_seq'::regclass) NOT NULL,
name character varying(255) NOT NULL,
permissions json,
created_on timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users_role OWNER TO QuikLinx;

CREATE SEQUENCE public.vendor_users_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;


ALTER TABLE public.vendor_users_seq OWNER TO QuikLinx;

CREATE TABLE public.vendor_users (
id integer DEFAULT nextval('public.vendor_users_seq'::regclass) NOT NULL,
u_name character varying(255) NOT NULL,
otherinfo json,
u_email character varying(20),
u_mobile character varying(20),
u_altr_mobile character varying(20),
gender integer,
u_dob date,
u_doj date,
u_status integer,
u_address json,
u_aadhar character varying(50),
u_aadhar_img character varying(255),
u_pan character varying(50),
u_pan_img character varying(255),
user_role integer,
created_on timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
updated_on timestamp(0) without time zone NOT NULL,
tenant_slug character varying(50) NOT NULL,
password character varying,
points double precision DEFAULT 0
);


ALTER TABLE public.vendor_users OWNER TO QuikLinx;


ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);



ALTER TABLE ONLY public.batch
  ADD CONSTRAINT batch_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.categorypoints
  ADD CONSTRAINT categorypoints_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.productcategories
  ADD CONSTRAINT productcategories_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.productpoints
  ADD CONSTRAINT productpoints_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.products
  ADD CONSTRAINT products_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.productsubcategories
  ADD CONSTRAINT productsubcategories_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.qr_code
  ADD CONSTRAINT qr_code_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.qrcodehistory
  ADD CONSTRAINT qrcodehistory_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.users
  ADD CONSTRAINT users_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.vendor_users
  ADD CONSTRAINT vendor_users_pkey PRIMARY KEY (id);

  CREATE SEQUENCE public.gifts_seq;
  CREATE TABLE  public.gifts
  (
  
    id integer NOT NULL DEFAULT  NEXTVAL ('gifts_seq'),
    g_brand varchar ,
    g_name varchar,
    g_value float , 
    g_price float,
    g_image varchar ,
    user_type integer,
    status boolean default true,
    created_on timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE SEQUENCE public.gift_redemption_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.gift_redemption (
    id integer DEFAULT nextval('public.gift_redemption_seq'::regclass) NOT NULL,
    user_id integer,
    user_role integer NOT NULL,
    ref_no character varying,
    gifts json,
    points_used character varying,
    status integer,
    created_on timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_on timestamp(0) without time zone NOT NULL,
    location json[]
);

`;

module.exports = query;

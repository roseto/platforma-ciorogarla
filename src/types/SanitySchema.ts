import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Business
 *
 *
 */
export interface Business extends SanityDocument {
  _type: "business";

  /**
   * Name — `string`
   *
   * The name of the business
   */
  name?: string;

  /**
   * Description — `text`
   *
   * A description of the business
   */
  description?: string;

  /**
   * Type — `string`
   *
   * The type of business
   */
  type?:
    | "restaurant"
    | "cafe"
    | "pub"
    | "barbershop"
    | "itp"
    | "market"
    | "pizza";

  /**
   * Slug — `slug`
   *
   * The slug of the business
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Logo — `image`
   *
   * The logo of the business
   */
  logo?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Cover — `image`
   *
   * The cover image of the business
   */
  cover?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Photos — `array`
   *
   * The photos of the business
   */
  photos?: Array<
    SanityKeyed<{
      _type: "photo";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * Prices — `string`
   *
   * The price range of the business
   */
  prices?: "$" | "$$" | "$$$" | "$$$$";

  /**
   * Prices link — `url`
   *
   * The link to the prices page
   */
  pricesLink?: string;

  /**
   * Is sponsor — `boolean`
   *
   * Is the business a sponsor of Ciorogarla Unita
   */
  isSponsor?: boolean;

  /**
   * Location — `object`
   *
   * The location of the business
   */
  location?: {
    _type: "location";
    /**
     * Address — `string`
     *
     * A human readable address
     */
    address?: string;

    /**
     * Coordinates — `geopoint`
     *
     * The coordinates of the location
     */
    coordinates?: SanityGeoPoint;
  };

  /**
   * Contact — `object`
   *
   * The contact information of the business
   */
  contact?: {
    _type: "contact";
    /**
     * Phone — `string`
     *
     * The phone number of the business
     */
    phone?: string;

    /**
     * Email — `string`
     *
     * The email address of the business
     */
    email?: string;

    /**
     * Website — `url`
     *
     * The website of the business
     */
    website?: string;

    /**
     * Facebook — `url`
     *
     * The Facebook page of the business
     */
    facebook?: string;

    /**
     * Instagram — `url`
     *
     * The Instagram page of the business
     */
    instagram?: string;
  };
}

/**
 * Organisation
 *
 *
 */
export interface Organisation extends SanityDocument {
  _type: "organisation";

  /**
   * Name — `string`
   *
   * The name of the organisation
   */
  name?: string;

  /**
   * Link — `url`
   *
   * The link to the organisation
   */
  link?: string;

  /**
   * Logo — `image`
   *
   * The logo of the organisation
   */
  logo?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

/**
 * Volunteering Project
 *
 *
 */
export interface VolunteeringProject extends SanityDocument {
  _type: "volunteeringProject";

  /**
   * Name — `string`
   *
   * The name of the project
   */
  name?: string;

  /**
   * Description — `text`
   *
   * The description of the project
   */
  description?: string;

  /**
   * Organisation — `reference`
   *
   * The organisation that the project belongs to
   */
  organisation?: SanityReference<Organisation>;

  /**
   * Image — `image`
   *
   * An image for the project
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Location — `geopoint`
   *
   * The location of the project
   */
  location?: SanityGeoPoint;

  /**
   * Infopack — `file`
   *
   * The infopack of the project
   */
  infopack?: { _type: "file"; asset: SanityReference<any> };

  /**
   * Country — `string`
   *
   * The country where the project takes place
   */
  country?: string;

  /**
   * Period — `object`
   *
   * The period of the project
   */
  period?: {
    _type: "period";
    /**
     * From Date — `date`
     *
     * The date that the project starts
     */
    fromDate?: string;

    /**
     * To Date — `date`
     *
     * The date that the project ends
     */
    toDate?: string;
  };
}

/**
 * User
 *
 *
 */
export interface User extends SanityDocument {
  _type: "user";

  /**
   * Display Name — `string`
   *
   *
   */
  displayName?: string;

  /**
   * Photo URL — `url`
   *
   *
   */
  photoURL?: string;

  /**
   * UID — `string`
   *
   *
   */
  uid?: string;
}

export type Documents = Business | Organisation | VolunteeringProject | User;

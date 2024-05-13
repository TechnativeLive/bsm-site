import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  MediaAttribute,
  TextAttribute,
  DynamicZoneAttribute,
  ComponentAttribute,
  UIDAttribute,
  SingleTypeSchema,
  DateAttribute,
  ComponentSchema,
  RichTextAttribute,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferToken extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    articles: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::article.article'
    >;
    avatar: MediaAttribute;
    jobTitle: StringAttribute;
    firstname: StringAttribute & RequiredAttribute;
    lastname: StringAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginSlugifySlug extends CollectionTypeSchema {
  info: {
    singularName: 'slug';
    pluralName: 'slugs';
    displayName: 'slug';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    slug: TextAttribute;
    count: IntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiArticleArticle extends CollectionTypeSchema {
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'article';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    blocks: DynamicZoneAttribute<
      ['blocks.hero', 'blocks.cta', 'blocks.rich-text']
    >;
    seo: ComponentAttribute<'seo.seo'>;
    authors: RelationAttribute<
      'api::article.article',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    slug: UIDAttribute<'api::article.article', 'title'> & RequiredAttribute;
    tags: RelationAttribute<
      'api::article.article',
      'manyToMany',
      'api::tag.tag'
    >;
    cover: MediaAttribute & RequiredAttribute;
    hero: ComponentAttribute<'blocks.hero'>;
    description: TextAttribute;
    youtubeEmbed: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCalendarCalendar extends SingleTypeSchema {
  info: {
    singularName: 'calendar';
    pluralName: 'calendars';
    displayName: 'calendar';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    current: RelationAttribute<
      'api::calendar.calendar',
      'oneToMany',
      'api::calendar-item.calendar-item'
    >;
    archive: RelationAttribute<
      'api::calendar.calendar',
      'oneToMany',
      'api::calendar-item.calendar-item'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::calendar.calendar',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::calendar.calendar',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCalendarItemCalendarItem extends CollectionTypeSchema {
  info: {
    singularName: 'calendar-item';
    pluralName: 'calendar-items';
    displayName: 'calendarItem';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    track: RelationAttribute<
      'api::calendar-item.calendar-item',
      'oneToOne',
      'api::track.track'
    >;
    start: DateAttribute & RequiredAttribute;
    end: DateAttribute & RequiredAttribute;
    name: StringAttribute & RequiredAttribute;
    slug: UIDAttribute<'api::calendar-item.calendar-item', 'name'> &
      RequiredAttribute;
    ticketUrl: StringAttribute;
    watchUrl: StringAttribute;
    files: MediaAttribute;
    schedule: ComponentAttribute<'utils.schedule', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::calendar-item.calendar-item',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::calendar-item.calendar-item',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiHomepageHomepage extends SingleTypeSchema {
  info: {
    singularName: 'homepage';
    pluralName: 'homepages';
    displayName: 'homepage';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    footerLinks: ComponentAttribute<'shared.link', true>;
    sponsors: RelationAttribute<
      'api::homepage.homepage',
      'oneToMany',
      'api::sponsor.sponsor'
    >;
    socials: ComponentAttribute<'shared.social', true>;
    featureLinks: ComponentAttribute<'image.image-link', true> &
      SetMinMax<{
        min: 3;
        max: 3;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::homepage.homepage',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::homepage.homepage',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiPhotoGalleryPhotoGallery extends SingleTypeSchema {
  info: {
    singularName: 'photo-gallery';
    pluralName: 'photo-galleries';
    displayName: 'photoGallery';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    imageCollections: ComponentAttribute<'image.image-collection', true>;
    title: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::photo-gallery.photo-gallery',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::photo-gallery.photo-gallery',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiRiderRider extends CollectionTypeSchema {
  info: {
    singularName: 'rider';
    pluralName: 'riders';
    displayName: 'rider';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstname: StringAttribute & RequiredAttribute;
    lastname: StringAttribute & RequiredAttribute;
    bib: StringAttribute & RequiredAttribute;
    dob: DateAttribute;
    bike: StringAttribute;
    startedCompeting: DateAttribute;
    tyres: StringAttribute;
    job: StringAttribute;
    team: RelationAttribute<'api::rider.rider', 'manyToOne', 'api::team.team'>;
    headshot: MediaAttribute;
    bio: TextAttribute;
    sponsors: RelationAttribute<
      'api::rider.rider',
      'oneToMany',
      'api::sponsor.sponsor'
    >;
    championship: EnumerationAttribute<
      [
        'British Supermoto',
        'National Supermoto',
        'British & National Supermoto'
      ]
    >;
    hometown: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::rider.rider',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::rider.rider',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiRiderInfoRiderInfo extends SingleTypeSchema {
  info: {
    singularName: 'rider-info';
    pluralName: 'rider-infos';
    displayName: 'riderInfo';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    cards: ComponentAttribute<'shared.card', true>;
    content: DynamicZoneAttribute<
      ['blocks.cta', 'blocks.hero', 'blocks.rich-text']
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::rider-info.rider-info',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::rider-info.rider-info',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiSeasonSeason extends CollectionTypeSchema {
  info: {
    singularName: 'season';
    pluralName: 'seasons';
    displayName: 'season';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    slug: UIDAttribute<'api::season.season', 'name'>;
    category: ComponentAttribute<'scores.standings-table', true> &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    start: DateAttribute & RequiredAttribute;
    end: DateAttribute & RequiredAttribute;
    championship: EnumerationAttribute<
      ['British Supermoto', 'National Supermoto']
    > &
      RequiredAttribute &
      DefaultTo<'British Supermoto'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::season.season',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::season.season',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiSponsorSponsor extends CollectionTypeSchema {
  info: {
    singularName: 'sponsor';
    pluralName: 'sponsors';
    displayName: 'sponsor';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute & UniqueAttribute;
    logos: ComponentAttribute<'image.logo', true>;
    url: StringAttribute;
    tier: IntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }> &
      DefaultTo<1>;
    description: TextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::sponsor.sponsor',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::sponsor.sponsor',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiTagTag extends CollectionTypeSchema {
  info: {
    singularName: 'tag';
    pluralName: 'tags';
    displayName: 'tag';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: StringAttribute & RequiredAttribute;
    priority: EnumerationAttribute<['high', 'medium', 'low']> &
      RequiredAttribute &
      DefaultTo<'low'>;
    slug: UIDAttribute<'api::tag.tag', 'label'> & RequiredAttribute;
    articles: RelationAttribute<
      'api::tag.tag',
      'manyToMany',
      'api::article.article'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::tag.tag', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::tag.tag', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiTeamTeam extends CollectionTypeSchema {
  info: {
    singularName: 'team';
    pluralName: 'teams';
    displayName: 'team';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    sponsors: RelationAttribute<
      'api::team.team',
      'oneToMany',
      'api::sponsor.sponsor'
    >;
    riders: RelationAttribute<
      'api::team.team',
      'oneToMany',
      'api::rider.rider'
    >;
    slug: UIDAttribute<'api::team.team', 'name'> & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::team.team', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::team.team', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiTrackTrack extends CollectionTypeSchema {
  info: {
    singularName: 'track';
    pluralName: 'tracks';
    displayName: 'track';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute & UniqueAttribute;
    layout: MediaAttribute;
    cover: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::track.track',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::track.track',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface BlocksCta extends ComponentSchema {
  info: {
    displayName: 'cta';
    description: 'Call to Action';
  };
  attributes: {
    heading: StringAttribute;
    link: ComponentAttribute<'shared.link'>;
  };
}

export interface BlocksHero extends ComponentSchema {
  info: {
    displayName: 'hero';
    description: 'Banner section';
  };
  attributes: {
    images: MediaAttribute;
    header: ComponentAttribute<'shared.header'>;
    buttons: ComponentAttribute<'shared.button', true>;
    fullWidth: BooleanAttribute & DefaultTo<false>;
  };
}

export interface BlocksRichText extends ComponentSchema {
  info: {
    displayName: 'richText';
  };
  attributes: {
    content: RichTextAttribute;
  };
}

export interface ImageImageCollectionGroup extends ComponentSchema {
  info: {
    displayName: 'imageCollectionGroup';
  };
  attributes: {
    title: StringAttribute;
  };
}

export interface ImageImageCollection extends ComponentSchema {
  info: {
    displayName: 'imageCollection';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    files: MediaAttribute;
    links: ComponentAttribute<'shared.link', true>;
  };
}

export interface ImageImageLink extends ComponentSchema {
  info: {
    displayName: 'imageLink';
  };
  attributes: {
    link: ComponentAttribute<'shared.link'> & RequiredAttribute;
    image: MediaAttribute & RequiredAttribute;
  };
}

export interface ImageLogo extends ComponentSchema {
  info: {
    displayName: 'Logo';
    description: '';
  };
  attributes: {
    kind: EnumerationAttribute<['base', 'light', 'dark']> &
      RequiredAttribute &
      DefaultTo<'base'>;
    image: MediaAttribute & RequiredAttribute;
  };
}

export interface ScoresPodium extends ComponentSchema {
  info: {
    displayName: 'podium';
  };
  attributes: {
    image: MediaAttribute;
  };
}

export interface ScoresStandingsTable extends ComponentSchema {
  info: {
    displayName: 'standingsTable';
    description: '';
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    description: TextAttribute;
    standings: JSONAttribute;
    slug: StringAttribute & RequiredAttribute;
    podiumFirst: ComponentAttribute<'scores.podium'>;
    podiumSecond: ComponentAttribute<'scores.podium', true>;
    podiumThird: ComponentAttribute<'scores.podium'>;
    standingsSheetName: StringAttribute;
  };
}

export interface SeoMeta extends ComponentSchema {
  info: {
    displayName: 'Meta';
  };
  attributes: {
    name: StringAttribute;
    content: StringAttribute;
  };
}

export interface SeoSeo extends ComponentSchema {
  info: {
    displayName: 'seo';
  };
  attributes: {
    metaTitle: StringAttribute & RequiredAttribute;
    metaDescription: StringAttribute;
    meta: ComponentAttribute<'seo.meta', true>;
    metaImage: MediaAttribute;
    structuredData: JSONAttribute;
    preventIndexing: BooleanAttribute;
  };
}

export interface SharedButton extends ComponentSchema {
  info: {
    displayName: 'button';
  };
  attributes: {
    theme: EnumerationAttribute<['primary', 'secondary', 'neutral', 'subtle']>;
    links: ComponentAttribute<'shared.link', true>;
  };
}

export interface SharedCard extends ComponentSchema {
  info: {
    displayName: 'card';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    label: StringAttribute;
    description: TextAttribute;
    link: ComponentAttribute<'shared.link'>;
  };
}

export interface SharedHeader extends ComponentSchema {
  info: {
    displayName: 'header';
    description: '';
  };
  attributes: {
    title: StringAttribute;
    description: StringAttribute;
  };
}

export interface SharedLink extends ComponentSchema {
  info: {
    displayName: 'link';
  };
  attributes: {
    url: StringAttribute;
    label: StringAttribute & RequiredAttribute;
    isExternal: BooleanAttribute & DefaultTo<true>;
    theme: EnumerationAttribute<['primary', 'secondary', 'neutral']> &
      DefaultTo<'neutral'>;
  };
}

export interface SharedSocial extends ComponentSchema {
  info: {
    displayName: 'social';
    description: '';
  };
  attributes: {
    platform: EnumerationAttribute<
      ['twitter', 'instagram', 'facebook', 'meta', 'tiktok', 'youtube']
    > &
      RequiredAttribute &
      DefaultTo<'instagram'>;
    url: StringAttribute & RequiredAttribute;
  };
}

export interface UtilsScheduleItem extends ComponentSchema {
  info: {
    displayName: 'scheduleItem';
  };
  attributes: {
    label: StringAttribute & RequiredAttribute;
    start: StringAttribute;
    end: StringAttribute;
  };
}

export interface UtilsSchedule extends ComponentSchema {
  info: {
    displayName: 'schedule';
    description: '';
  };
  attributes: {
    items: ComponentAttribute<'utils.schedule-item', true>;
    title: StringAttribute & RequiredAttribute;
    file: MediaAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::slugify.slug': PluginSlugifySlug;
      'api::article.article': ApiArticleArticle;
      'api::calendar.calendar': ApiCalendarCalendar;
      'api::calendar-item.calendar-item': ApiCalendarItemCalendarItem;
      'api::homepage.homepage': ApiHomepageHomepage;
      'api::photo-gallery.photo-gallery': ApiPhotoGalleryPhotoGallery;
      'api::rider.rider': ApiRiderRider;
      'api::rider-info.rider-info': ApiRiderInfoRiderInfo;
      'api::season.season': ApiSeasonSeason;
      'api::sponsor.sponsor': ApiSponsorSponsor;
      'api::tag.tag': ApiTagTag;
      'api::team.team': ApiTeamTeam;
      'api::track.track': ApiTrackTrack;
      'blocks.cta': BlocksCta;
      'blocks.hero': BlocksHero;
      'blocks.rich-text': BlocksRichText;
      'image.image-collection-group': ImageImageCollectionGroup;
      'image.image-collection': ImageImageCollection;
      'image.image-link': ImageImageLink;
      'image.logo': ImageLogo;
      'scores.podium': ScoresPodium;
      'scores.standings-table': ScoresStandingsTable;
      'seo.meta': SeoMeta;
      'seo.seo': SeoSeo;
      'shared.button': SharedButton;
      'shared.card': SharedCard;
      'shared.header': SharedHeader;
      'shared.link': SharedLink;
      'shared.social': SharedSocial;
      'utils.schedule-item': UtilsScheduleItem;
      'utils.schedule': UtilsSchedule;
    }
  }
}

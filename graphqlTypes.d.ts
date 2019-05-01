// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation | ISubscription
    errors?: Array<IGraphQLResponseError>
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string
    locations?: Array<IGraphQLResponseErrorLocation>
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any
  }

  interface IGraphQLResponseErrorLocation {
    line: number
    column: number
  }

  interface IQuery {
    __typename: 'query.ts'
    YoutubeApi: IYoutubeResources | null
    channel: IChannel | null
  }

  interface IYoutubeApiOnQueryArguments {
    /**
     * Data format for the response.
     */
    alt?: AltRootEnumParam | null

    /**
     * Selector specifying which fields to include in a partial response.
     */
    fields?: string | null

    /**
     * API key. Your API key identifies your project and provides you with API
     * access, quota, and reports. Required unless you provide an OAuth 2.0 token.
     */
    key?: string | null

    /**
     * OAuth 2.0 token for the current user.
     */
    oauth_token?: string | null

    /**
     * Returns response with indentations and line breaks.
     */
    prettyPrint?: boolean | null

    /**
     * An opaque string that represents a user for quota purposes. Must not exceed 40 characters.
     */
    quotaUser?: string | null

    /**
     * Deprecated. Please use quotaUser instead.
     */
    userIp?: string | null
  }

  interface IChannelOnQueryArguments {
    id: string
  }

  const enum AltRootEnumParam {
    /**
     * Responses with Content-Type of application/json
     */
    json = 'json'
  }

  interface IYoutubeResources {
    __typename: 'YoutubeResources'
    activities: IActivities | null
    captions: ICaptions | null
    channelSections: IChannelSections | null
    channels: IChannels | null
    commentThreads: ICommentThreads | null
    comments: IComments | null
    guideCategories: IGuideCategories | null
    i18nLanguages: II18nLanguages | null
    i18nRegions: II18nRegions | null
    liveBroadcasts: ILiveBroadcasts | null
    liveChatMessages: ILiveChatMessages | null
    liveChatModerators: ILiveChatModerators | null
    liveStreams: ILiveStreams | null
    playlistItems: IPlaylistItems | null
    playlists: IPlaylists | null
    search: ISearch | null
    sponsors: ISponsors | null
    subscriptions: ISubscriptions | null
    superChatEvents: ISuperChatEvents | null
    videoAbuseReportReasons: IVideoAbuseReportReasons | null
    videoCategories: IVideoCategories | null
    videos: IVideos | null
  }

  interface IActivities {
    __typename: 'Activities_'

    /**
     * Returns a list of channel activity events that match the request criteria. For
     * example, you can retrieve events associated with a particular channel, events
     * associated with the user's subscriptions and Google+ friends, or the YouTube
     * home page feed, which is customized for each user.
     */
    list: IActivityListResponse | null
  }

  interface IListOnActivitiesArguments {
    /**
     * The channelId parameter specifies a unique YouTube channel ID. The API will
     * then return a list of that channel's activities.
     */
    channelId?: string | null

    /**
     * Set this parameter's value to true to retrieve the activity feed that
     * displays on the YouTube home page for the currently authenticated user.
     */
    home?: boolean | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * Set this parameter's value to true to retrieve a feed of the authenticated user's activities.
     */
    mine?: boolean | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more activity
     * resource properties that the API response will include.
     *
     * If the parameter identifies a property that contains child properties, the
     * child properties will be included in the response. For example, in an
     * activity resource, the snippet property contains other properties that
     * identify the type of activity, a display title for the activity, and so
     * forth. If you set part=snippet, the API response will also contain all of
     * those nested properties.
     */
    part: string

    /**
     * The publishedAfter parameter specifies the earliest date and time that an
     * activity could have occurred for that activity to be included in the API
     * response. If the parameter value specifies a day, but not a time, then any
     * activities that occurred that day will be included in the result set. The
     * value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAfter?: string | null

    /**
     * The publishedBefore parameter specifies the date and time before which an
     * activity must have occurred for that activity to be included in the API
     * response. If the parameter value specifies a day, but not a time, then any
     * activities that occurred that day will be excluded from the result set. The
     * value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedBefore?: string | null

    /**
     * The regionCode parameter instructs the API to return results for the
     * specified country. The parameter value is an ISO 3166-1 alpha-2 country
     * code. YouTube uses this value when the authorized user's previous activity
     * on YouTube does not provide enough information to generate the activity feed.
     */
    regionCode?: string | null
  }

  interface IActivityListResponse {
    __typename: 'ActivityListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of activities, or events, that match the request criteria.
     */
    items: Array<IActivity | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#activityListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * An activity resource contains information about an action that a particular
   * channel, or user, has taken on YouTube.The actions reported in activity feeds
   * include rating a video, sharing a video, marking a video as a favorite,
   * commenting on a video, uploading a video, and so forth. Each activity resource
   * identifies the type of action, the channel associated with the action, and the
   * resource(s) associated with the action, such as the video that was rated or uploaded.
   */
  interface IActivity {
    __typename: 'Activity'

    /**
     * The contentDetails object contains information about the content associated
     * with the activity. For example, if the snippet.type value is videoRated, then
     * the contentDetails object's content identifies the rated video.
     */
    contentDetails: IActivityContentDetails | null

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the activity.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#activity".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the activity, including the activity's type and group ID.
     */
    snippet: IActivitySnippet | null
  }

  /**
   * Details about the content of an activity: the video that was shared, the channel that was subscribed to, etc.
   */
  interface IActivityContentDetails {
    __typename: 'ActivityContentDetails'

    /**
     * The bulletin object contains details about a channel bulletin post. This
     * object is only present if the snippet.type is bulletin.
     */
    bulletin: IActivityContentDetailsBulletin | null

    /**
     * The channelItem object contains details about a resource which was added to a
     * channel. This property is only present if the snippet.type is channelItem.
     */
    channelItem: IActivityContentDetailsChannelItem | null

    /**
     * The comment object contains information about a resource that received a
     * comment. This property is only present if the snippet.type is comment.
     */
    comment: IActivityContentDetailsComment | null

    /**
     * The favorite object contains information about a video that was marked as a
     * favorite video. This property is only present if the snippet.type is favorite.
     */
    favorite: IActivityContentDetailsFavorite | null

    /**
     * The like object contains information about a resource that received a positive
     * (like) rating. This property is only present if the snippet.type is like.
     */
    like: IActivityContentDetailsLike | null

    /**
     * The playlistItem object contains information about a new playlist item. This
     * property is only present if the snippet.type is playlistItem.
     */
    playlistItem: IActivityContentDetailsPlaylistItem | null

    /**
     * The promotedItem object contains details about a resource which is being
     * promoted. This property is only present if the snippet.type is promotedItem.
     */
    promotedItem: IActivityContentDetailsPromotedItem | null

    /**
     * The recommendation object contains information about a recommended resource.
     * This property is only present if the snippet.type is recommendation.
     */
    recommendation: IActivityContentDetailsRecommendation | null

    /**
     * The social object contains details about a social network post. This property
     * is only present if the snippet.type is social.
     */
    social: IActivityContentDetailsSocial | null

    /**
     * The subscription object contains information about a channel that a user
     * subscribed to. This property is only present if the snippet.type is subscription.
     */
    subscription: IActivityContentDetailsSubscription | null

    /**
     * The upload object contains information about the uploaded video. This property
     * is only present if the snippet.type is upload.
     */
    upload: IActivityContentDetailsUpload | null
  }

  /**
   * Details about a channel bulletin post.
   */
  interface IActivityContentDetailsBulletin {
    __typename: 'ActivityContentDetailsBulletin'

    /**
     * The resourceId object contains information that identifies the resource associated with a bulletin post.
     */
    resourceId: IResourceId | null
  }

  /**
   * A resource id is a generic reference that points to another YouTube resource.
   */
  interface IResourceId {
    __typename: 'ResourceId'

    /**
     * The ID that YouTube uses to uniquely identify the referred resource, if that
     * resource is a channel. This property is only present if the resourceId.kind
     * value is youtube#channel.
     */
    channelId: string | null

    /**
     * The type of the API resource.
     */
    kind: string | null

    /**
     * The ID that YouTube uses to uniquely identify the referred resource, if that
     * resource is a playlist. This property is only present if the resourceId.kind
     * value is youtube#playlist.
     */
    playlistId: string | null

    /**
     * The ID that YouTube uses to uniquely identify the referred resource, if that
     * resource is a video. This property is only present if the resourceId.kind
     * value is youtube#video.
     */
    videoId: string | null
  }

  /**
   * Details about a resource which was added to a channel.
   */
  interface IActivityContentDetailsChannelItem {
    __typename: 'ActivityContentDetailsChannelItem'

    /**
     * The resourceId object contains information that identifies the resource that was added to the channel.
     */
    resourceId: IResourceId | null
  }

  /**
   * Information about a resource that received a comment.
   */
  interface IActivityContentDetailsComment {
    __typename: 'ActivityContentDetailsComment'

    /**
     * The resourceId object contains information that identifies the resource associated with the comment.
     */
    resourceId: IResourceId | null
  }

  /**
   * Information about a video that was marked as a favorite video.
   */
  interface IActivityContentDetailsFavorite {
    __typename: 'ActivityContentDetailsFavorite'

    /**
     * The resourceId object contains information that identifies the resource that was marked as a favorite.
     */
    resourceId: IResourceId | null
  }

  /**
   * Information about a resource that received a positive (like) rating.
   */
  interface IActivityContentDetailsLike {
    __typename: 'ActivityContentDetailsLike'

    /**
     * The resourceId object contains information that identifies the rated resource.
     */
    resourceId: IResourceId | null
  }

  /**
   * Information about a new playlist item.
   */
  interface IActivityContentDetailsPlaylistItem {
    __typename: 'ActivityContentDetailsPlaylistItem'

    /**
     * The value that YouTube uses to uniquely identify the playlist.
     */
    playlistId: string | null

    /**
     * ID of the item within the playlist.
     */
    playlistItemId: string | null

    /**
     * The resourceId object contains information about the resource that was added to the playlist.
     */
    resourceId: IResourceId | null
  }

  /**
   * Details about a resource which is being promoted.
   */
  interface IActivityContentDetailsPromotedItem {
    __typename: 'ActivityContentDetailsPromotedItem'

    /**
     * The URL the client should fetch to request a promoted item.
     */
    adTag: string | null

    /**
     * The URL the client should ping to indicate that the user clicked through on this promoted item.
     */
    clickTrackingUrl: string | null

    /**
     * The URL the client should ping to indicate that the user was shown this promoted item.
     */
    creativeViewUrl: string | null

    /**
     * The type of call-to-action, a message to the user indicating action that can be taken.
     */
    ctaType: string | null

    /**
     * The custom call-to-action button text. If specified, it will override the default button text for the cta_type.
     */
    customCtaButtonText: string | null

    /**
     * The text description to accompany the promoted item.
     */
    descriptionText: string | null

    /**
     * The URL the client should direct the user to, if the user chooses to visit the advertiser's website.
     */
    destinationUrl: string | null

    /**
     * The list of forecasting URLs. The client should ping all of these URLs when a
     * promoted item is not available, to indicate that a promoted item could have been shown.
     */
    forecastingUrl: Array<string | null> | null

    /**
     * The list of impression URLs. The client should ping all of these URLs to
     * indicate that the user was shown this promoted item.
     */
    impressionUrl: Array<string | null> | null

    /**
     * The ID that YouTube uses to uniquely identify the promoted video.
     */
    videoId: string | null
  }

  /**
   * Information that identifies the recommended resource.
   */
  interface IActivityContentDetailsRecommendation {
    __typename: 'ActivityContentDetailsRecommendation'

    /**
     * The reason that the resource is recommended to the user.
     */
    reason: string | null

    /**
     * The resourceId object contains information that identifies the recommended resource.
     */
    resourceId: IResourceId | null

    /**
     * The seedResourceId object contains information about the resource that caused the recommendation.
     */
    seedResourceId: IResourceId | null
  }

  /**
   * Details about a social network post.
   */
  interface IActivityContentDetailsSocial {
    __typename: 'ActivityContentDetailsSocial'

    /**
     * The author of the social network post.
     */
    author: string | null

    /**
     * An image of the post's author.
     */
    imageUrl: string | null

    /**
     * The URL of the social network post.
     */
    referenceUrl: string | null

    /**
     * The resourceId object encapsulates information that identifies the resource associated with a social network post.
     */
    resourceId: IResourceId | null

    /**
     * The name of the social network.
     */
    type: string | null
  }

  /**
   * Information about a channel that a user subscribed to.
   */
  interface IActivityContentDetailsSubscription {
    __typename: 'ActivityContentDetailsSubscription'

    /**
     * The resourceId object contains information that identifies the resource that the user subscribed to.
     */
    resourceId: IResourceId | null
  }

  /**
   * Information about the uploaded video.
   */
  interface IActivityContentDetailsUpload {
    __typename: 'ActivityContentDetailsUpload'

    /**
     * The ID that YouTube uses to uniquely identify the uploaded video.
     */
    videoId: string | null
  }

  /**
   * Basic details about an activity, including title, description, thumbnails, activity type and group.
   */
  interface IActivitySnippet {
    __typename: 'ActivitySnippet'

    /**
     * The ID that YouTube uses to uniquely identify the channel associated with the activity.
     */
    channelId: string | null

    /**
     * Channel title for the channel responsible for this activity
     */
    channelTitle: string | null

    /**
     * The description of the resource primarily associated with the activity.
     */
    description: string | null

    /**
     * The group ID associated with the activity. A group ID identifies user events
     * that are associated with the same user and resource. For example, if a user
     * rates a video and marks the same video as a favorite, the entries for those
     * events would have the same group ID in the user's activity feed. In your user
     * interface, you can avoid repetition by grouping events with the same groupId value.
     */
    groupId: string | null

    /**
     * The date and time that the video was uploaded. The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAt: string | null

    /**
     * A map of thumbnail images associated with the resource that is primarily
     * associated with the activity. For each object in the map, the key is the name
     * of the thumbnail image, and the value is an object that contains other
     * information about the thumbnail.
     */
    thumbnails: IThumbnailDetails | null

    /**
     * The title of the resource primarily associated with the activity.
     */
    title: string | null

    /**
     * The type of activity that the resource describes.
     */
    type: string | null
  }

  /**
   * Internal representation of thumbnails for a YouTube resource.
   */
  interface IThumbnailDetails {
    __typename: 'ThumbnailDetails'

    /**
     * The default image for this resource.
     */
    default: IThumbnail | null

    /**
     * The high quality image for this resource.
     */
    high: IThumbnail | null

    /**
     * The maximum resolution quality image for this resource.
     */
    maxres: IThumbnail | null

    /**
     * The medium quality image for this resource.
     */
    medium: IThumbnail | null

    /**
     * The standard quality image for this resource.
     */
    standard: IThumbnail | null
  }

  /**
   * A thumbnail is an image representing a YouTube resource.
   */
  interface IThumbnail {
    __typename: 'Thumbnail'

    /**
     * (Optional) Height of the thumbnail image.
     */
    height: number | null

    /**
     * The thumbnail image's URL.
     */
    url: string | null

    /**
     * (Optional) Width of the thumbnail image.
     */
    width: number | null
  }

  /**
   * Paging details for lists of resources, including total number of items available
   * and number of resources returned in a single page.
   */
  interface IPageInfo {
    __typename: 'PageInfo'

    /**
     * The number of results included in the API response.
     */
    resultsPerPage: number | null

    /**
     * The total number of results in the result set.
     */
    totalResults: number | null
  }

  /**
   * Stub token pagination template to suppress results.
   */
  interface ITokenPagination {
    __typename: 'TokenPagination'
    thisTypeHasNoFieldsAndGraphQLDontLikeThat: boolean | null
  }

  interface ICaptions {
    __typename: 'Captions_'

    /**
     * Downloads a caption track. The caption track is returned in its original
     * format unless the request specifies a value for the tfmt parameter and in its
     * original language unless the request specifies a value for the tlang parameter.
     */
    download: string | null

    /**
     * Returns a list of caption tracks that are associated with a specified video.
     * Note that the API response does not contain the actual captions and that the
     * captions.download method provides the ability to retrieve a caption track.
     */
    list: ICaptionListResponse | null
  }

  interface IDownloadOnCaptionsArguments {
    /**
     * The id parameter identifies the caption track that is being retrieved. The
     * value is a caption track ID as identified by the id property in a caption resource.
     */
    id: string

    /**
     * ID of the Google+ Page for the channel that the request is be on behalf of
     */
    onBehalfOf?: string | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The actual CMS
     * account that the user authenticates with must be linked to the specified
     * YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null

    /**
     * The tfmt parameter specifies that the caption track should be returned in a
     * specific format. If the parameter is not included in the request, the track
     * is returned in its original format.
     */
    tfmt?: TfmtCaptionsEnumParam | null

    /**
     * The tlang parameter specifies that the API response should return a
     * translation of the specified caption track. The parameter value is an ISO
     * 639-1 two-letter language code that identifies the desired caption language.
     * The translation is generated by using machine translation, such as Google Translate.
     */
    tlang?: string | null
  }

  interface IListOnCaptionsArguments {
    /**
     * The id parameter specifies a comma-separated list of IDs that identify the
     * caption resources that should be retrieved. Each ID must identify a caption
     * track associated with the specified video.
     */
    id?: string | null

    /**
     * ID of the Google+ Page for the channel that the request is on behalf of.
     */
    onBehalfOf?: string | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The actual CMS
     * account that the user authenticates with must be linked to the specified
     * YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more caption
     * resource parts that the API response will include. The part names that you
     * can include in the parameter value are id and snippet.
     */
    part: string

    /**
     * The videoId parameter specifies the YouTube video ID of the video for which the API should return caption tracks.
     */
    videoId: string
  }

  const enum TfmtCaptionsEnumParam {
    /**
     * SubViewer subtitle.
     */
    sbv = 'sbv',

    /**
     * Scenarist Closed Caption format.
     */
    scc = 'scc',

    /**
     * SubRip subtitle.
     */
    srt = 'srt',

    /**
     * Timed Text Markup Language caption.
     */
    ttml = 'ttml',

    /**
     * Web Video Text Tracks caption.
     */
    vtt = 'vtt'
  }

  interface ICaptionListResponse {
    __typename: 'CaptionListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of captions that match the request criteria.
     */
    items: Array<ICaption | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#captionListResponse".
     */
    kind: string | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A caption resource represents a YouTube caption track. A caption track is associated with exactly one YouTube video.
   */
  interface ICaption {
    __typename: 'Caption'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the caption track.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#caption".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the caption.
     */
    snippet: ICaptionSnippet | null
  }

  /**
   * Basic details about a caption track, such as its language and name.
   */
  interface ICaptionSnippet {
    __typename: 'CaptionSnippet'

    /**
     * The type of audio track associated with the caption track.
     */
    audioTrackType: string | null

    /**
     * The reason that YouTube failed to process the caption track. This property is
     * only present if the state property's value is failed.
     */
    failureReason: string | null

    /**
     * Indicates whether YouTube synchronized the caption track to the audio track in
     * the video. The value will be true if a sync was explicitly requested when the
     * caption track was uploaded. For example, when calling the captions.insert or
     * captions.update methods, you can set the sync parameter to true to instruct
     * YouTube to sync the uploaded track to the video. If the value is false,
     * YouTube uses the time codes in the uploaded caption track to determine when to
     * display captions.
     */
    isAutoSynced: boolean | null

    /**
     * Indicates whether the track contains closed captions for the deaf and hard of hearing. The default value is false.
     */
    isCC: boolean | null

    /**
     * Indicates whether the caption track is a draft. If the value is true, then the
     * track is not publicly visible. The default value is false.
     */
    isDraft: boolean | null

    /**
     * Indicates whether caption track is formatted for "easy reader," meaning it is
     * at a third-grade level for language learners. The default value is false.
     */
    isEasyReader: boolean | null

    /**
     * Indicates whether the caption track uses large text for the vision-impaired. The default value is false.
     */
    isLarge: boolean | null

    /**
     * The language of the caption track. The property value is a BCP-47 language tag.
     */
    language: string | null

    /**
     * The date and time when the caption track was last updated. The value is
     * specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    lastUpdated: string | null

    /**
     * The name of the caption track. The name is intended to be visible to the user as an option during playback.
     */
    name: string | null

    /**
     * The caption track's status.
     */
    status: string | null

    /**
     * The caption track's type.
     */
    trackKind: string | null

    /**
     * The ID that YouTube uses to uniquely identify the video associated with the caption track.
     */
    videoId: string | null
  }

  interface IChannelSections {
    __typename: 'ChannelSections_'

    /**
     * Returns channelSection resources that match the API request criteria.
     */
    list: IChannelSectionListResponse | null
  }

  interface IListOnChannelSectionsArguments {
    /**
     * The channelId parameter specifies a YouTube channel ID. The API will only return that channel's channelSections.
     */
    channelId?: string | null

    /**
     * The hl parameter indicates that the snippet.localized property values in the
     * returned channelSection resources should be in the specified language if
     * localized values for that language are available. For example, if the API
     * request specifies hl=de, the snippet.localized properties in the API
     * response will contain German titles if German titles are available. Channel
     * owners can provide localized channel section titles using either the
     * channelSections.insert or channelSections.update method.
     */
    hl?: string | null

    /**
     * The id parameter specifies a comma-separated list of the YouTube
     * channelSection ID(s) for the resource(s) that are being retrieved. In a
     * channelSection resource, the id property specifies the YouTube
     * channelSection ID.
     */
    id?: string | null

    /**
     * Set this parameter's value to true to retrieve a feed of the authenticated user's channelSections.
     */
    mine?: boolean | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The CMS account that
     * the user authenticates with must be linked to the specified YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more
     * channelSection resource properties that the API response will include. The
     * part names that you can include in the parameter value are id, snippet, and
     * contentDetails.
     *
     * If the parameter identifies a property that contains child properties, the
     * child properties will be included in the response. For example, in a
     * channelSection resource, the snippet property contains other properties,
     * such as a display title for the channelSection. If you set part=snippet, the
     * API response will also contain all of those nested properties.
     */
    part: string
  }

  interface IChannelSectionListResponse {
    __typename: 'ChannelSectionListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of ChannelSections that match the request criteria.
     */
    items: Array<IChannelSection | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#channelSectionListResponse".
     */
    kind: string | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  interface IChannelSection {
    __typename: 'ChannelSection'

    /**
     * The contentDetails object contains details about the channel section content,
     * such as a list of playlists or channels featured in the section.
     */
    contentDetails: IChannelSectionContentDetails | null

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the channel section.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#channelSection".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the channel section, such as its type, style and title.
     */
    snippet: IChannelSectionSnippet | null

    /**
     * The targeting object contains basic targeting settings about the channel section.
     */
    targeting: IChannelSectionTargeting | null
  }

  /**
   * Details about a channelsection, including playlists and channels.
   */
  interface IChannelSectionContentDetails {
    __typename: 'ChannelSectionContentDetails'

    /**
     * The channel ids for type multiple_channels.
     */
    channels: Array<string | null> | null

    /**
     * The playlist ids for type single_playlist and multiple_playlists. For singlePlaylist, only one playlistId is allowed.
     */
    playlists: Array<string | null> | null
  }

  /**
   * Basic details about a channel section, including title, style and position.
   */
  interface IChannelSectionSnippet {
    __typename: 'ChannelSectionSnippet'

    /**
     * The ID that YouTube uses to uniquely identify the channel that published the channel section.
     */
    channelId: string | null

    /**
     * The language of the channel section's default title and description.
     */
    defaultLanguage: string | null

    /**
     * Localized title, read-only.
     */
    localized: IChannelSectionLocalization | null

    /**
     * The position of the channel section in the channel.
     */
    position: number | null

    /**
     * The style of the channel section.
     */
    style: string | null

    /**
     * The channel section's title for multiple_playlists and multiple_channels.
     */
    title: string | null

    /**
     * The type of the channel section.
     */
    type: string | null
  }

  /**
   * ChannelSection localization setting
   */
  interface IChannelSectionLocalization {
    __typename: 'ChannelSectionLocalization'

    /**
     * The localized strings for channel section's title.
     */
    title: string | null
  }

  /**
   * ChannelSection targeting setting.
   */
  interface IChannelSectionTargeting {
    __typename: 'ChannelSectionTargeting'

    /**
     * The country the channel section is targeting.
     */
    countries: Array<string | null> | null

    /**
     * The language the channel section is targeting.
     */
    languages: Array<string | null> | null

    /**
     * The region the channel section is targeting.
     */
    regions: Array<string | null> | null
  }

  interface IChannels {
    __typename: 'Channels_'

    /**
     * Returns a collection of zero or more channel resources that match the request criteria.
     */
    list: IChannelListResponse | null
  }

  interface IListOnChannelsArguments {
    /**
     * The categoryId parameter specifies a YouTube guide category, thereby
     * requesting YouTube channels associated with that category.
     */
    categoryId?: string | null

    /**
     * The forUsername parameter specifies a YouTube username, thereby requesting the channel associated with that username.
     */
    forUsername?: string | null

    /**
     * The hl parameter should be used for filter out the properties that are not
     * in the given language. Used for the brandingSettings part.
     */
    hl?: string | null

    /**
     * The id parameter specifies a comma-separated list of the YouTube channel
     * ID(s) for the resource(s) that are being retrieved. In a channel resource,
     * the id property specifies the channel's YouTube channel ID.
     */
    id?: string | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * Set this parameter's value to true to instruct the API to only return
     * channels managed by the content owner that the onBehalfOfContentOwner
     * parameter specifies. The user must be authenticated as a CMS account linked
     * to the specified content owner and onBehalfOfContentOwner must be provided.
     */
    managedByMe?: boolean | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * Set this parameter's value to true to instruct the API to only return channels owned by the authenticated user.
     */
    mine?: boolean | null

    /**
     * Use the subscriptions.list method and its mySubscribers parameter to
     * retrieve a list of subscribers to the authenticated user's channel.
     */
    mySubscribers?: boolean | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The CMS account that
     * the user authenticates with must be linked to the specified YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more channel
     * resource properties that the API response will include.
     *
     * If the parameter identifies a property that contains child properties, the
     * child properties will be included in the response. For example, in a channel
     * resource, the contentDetails property contains other properties, such as the
     * uploads properties. As such, if you set part=contentDetails, the API
     * response will also contain all of those nested properties.
     */
    part: string
  }

  interface IChannelListResponse {
    __typename: 'ChannelListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of channels that match the request criteria.
     */
    items: Array<IChannel | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#channelListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  interface IChannel {
    __typename: 'channel.ts'
    id: string | null
    createdOn: string | null
    track: ITrack | null
    name: string | null
    owner: IUser | null
    tracks: ITracks | null
    nowPlaying: ITrack | null
  }

  interface ITracksOnChannelArguments {
    first?: number | null
    after?: string | null
    played?: boolean | null
  }

  interface ITrack {
    __typename: 'Track'
    id: string | null
    videoId: string | null
    title: string | null
    owner: IUser | null
    addedOn: string | null
    state: TrackState | null
    thumb: string | null
  }

  interface IUser {
    __typename: 'user.ts'
    id: string | null
    googleId: string | null
    email: string | null
    emailVerified: boolean | null
    picture: string | null
    fullName: string | null
    firstName: string | null
    lastName: string | null
    locale: string | null
    createdOn: string | null
  }

  const enum TrackState {
    playing = 'playing',
    played = 'played',
    upcoming = 'upcoming'
  }

  interface ITracks {
    __typename: 'Tracks'
    totalCount: number | null
    edges: Array<ITracksEdge | null> | null
    pageInfo: ITrackPageInfo | null
  }

  interface ITracksEdge {
    __typename: 'TracksEdge'
    node: ITrack | null
    cursor: string | null
  }

  interface ITrackPageInfo {
    __typename: 'TrackPageInfo'
    endCursor: string | null
    hasNextPage: boolean | null
  }

  interface ICommentThreads {
    __typename: 'CommentThreads_'

    /**
     * Returns a list of comment threads that match the API request parameters.
     */
    list: ICommentThreadListResponse | null
  }

  interface IListOnCommentThreadsArguments {
    /**
     * The allThreadsRelatedToChannelId parameter instructs the API to return all
     * comment threads associated with the specified channel. The response can
     * include comments about the channel or about the channel's videos.
     */
    allThreadsRelatedToChannelId?: string | null

    /**
     * The channelId parameter instructs the API to return comment threads
     * containing comments about the specified channel. (The response will not
     * include comments left on videos that the channel uploaded.)
     */
    channelId?: string | null

    /**
     * The id parameter specifies a comma-separated list of comment thread IDs for the resources that should be retrieved.
     */
    id?: string | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     *
     * Note: This parameter is not supported for use in conjunction with the id parameter.
     */
    maxResults?: number | null

    /**
     * Set this parameter to limit the returned comment threads to a particular moderation state.
     *
     * Note: This parameter is not supported for use in conjunction with the id parameter.
     */
    moderationStatus?: ModerationStatusCommentThreadsEnumParam | null

    /**
     * The order parameter specifies the order in which the API response should list comment threads. Valid values are:
     * - time - Comment threads are ordered by time. This is the default behavior.
     * - relevance - Comment threads are ordered by relevance.Note: This parameter
     * is not supported for use in conjunction with the id parameter.
     */
    order?: OrderCommentThreadsEnumParam | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken property
     * identifies the next page of the result that can be retrieved.
     *
     * Note: This parameter is not supported for use in conjunction with the id parameter.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more
     * commentThread resource properties that the API response will include.
     */
    part: string

    /**
     * The searchTerms parameter instructs the API to limit the API response to
     * only contain comments that contain the specified search terms.
     *
     * Note: This parameter is not supported for use in conjunction with the id parameter.
     */
    searchTerms?: string | null

    /**
     * Set this parameter's value to html or plainText to instruct the API to
     * return the comments left by users in html formatted or in plain text.
     */
    textFormat?: TextFormatCommentThreadsEnumParam | null

    /**
     * The videoId parameter instructs the API to return comment threads associated with the specified video ID.
     */
    videoId?: string | null
  }

  const enum ModerationStatusCommentThreadsEnumParam {
    /**
     * Retrieve comment threads that are awaiting review by a moderator. A comment
     * thread can be included in the response if the top-level comment or at least
     * one of the replies to that comment are awaiting review.
     */
    heldForReview = 'heldForReview',

    /**
     * Retrieve comment threads classified as likely to be spam. A comment thread can
     * be included in the response if the top-level comment or at least one of the
     * replies to that comment is considered likely to be spam.
     */
    likelySpam = 'likelySpam',

    /**
     * Retrieve threads of published comments. This is the default value. A comment
     * thread can be included in the response if its top-level comment has been published.
     */
    published = 'published'
  }

  const enum OrderCommentThreadsEnumParam {
    /**
     * Order by relevance.
     */
    relevance = 'relevance',

    /**
     * Order by time.
     */
    time = 'time'
  }

  const enum TextFormatCommentThreadsEnumParam {
    /**
     * Returns the comments in HTML format. This is the default value.
     */
    html = 'html',

    /**
     * Returns the comments in plain text format.
     */
    plainText = 'plainText'
  }

  interface ICommentThreadListResponse {
    __typename: 'CommentThreadListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of comment threads that match the request criteria.
     */
    items: Array<ICommentThread | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#commentThreadListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A comment thread represents information that applies to a top level comment and
   * all its replies. It can also include the top level comment itself and some of the replies.
   */
  interface ICommentThread {
    __typename: 'CommentThread'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the comment thread.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#commentThread".
     */
    kind: string | null

    /**
     * The replies object contains a limited number of replies (if any) to the top level comment found in the snippet.
     */
    replies: ICommentThreadReplies | null

    /**
     * The snippet object contains basic details about the comment thread and also the top level comment.
     */
    snippet: ICommentThreadSnippet | null
  }

  /**
   * Comments written in (direct or indirect) reply to the top level comment.
   */
  interface ICommentThreadReplies {
    __typename: 'CommentThreadReplies'

    /**
     * A limited number of replies. Unless the number of replies returned equals
     * total_reply_count in the snippet the returned replies are only a subset of the
     * total number of replies.
     */
    comments: Array<IComment | null> | null
  }

  /**
   * A comment represents a single YouTube comment.
   */
  interface IComment {
    __typename: 'Comment'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the comment.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#comment".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the comment.
     */
    snippet: ICommentSnippet | null
  }

  /**
   * Basic details about a comment, such as its author and text.
   */
  interface ICommentSnippet {
    __typename: 'CommentSnippet'

    /**
     * The id of the author's YouTube channel, if any.
     */
    authorChannelId: string | null

    /**
     * Link to the author's YouTube channel, if any.
     */
    authorChannelUrl: string | null

    /**
     * The name of the user who posted the comment.
     */
    authorDisplayName: string | null

    /**
     * The URL for the avatar of the user who posted the comment.
     */
    authorProfileImageUrl: string | null

    /**
     * Whether the current viewer can rate this comment.
     */
    canRate: boolean | null

    /**
     * The id of the corresponding YouTube channel. In case of a channel comment this
     * is the channel the comment refers to. In case of a video comment it's the
     * video's channel.
     */
    channelId: string | null

    /**
     * The total number of likes this comment has received.
     */
    likeCount: number | null

    /**
     * The comment's moderation status. Will not be set if the comments were requested through the id filter.
     */
    moderationStatus: string | null

    /**
     * The unique id of the parent comment, only set for replies.
     */
    parentId: string | null

    /**
     * The date and time when the comment was orignally published. The value is
     * specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAt: string | null

    /**
     * The comment's text. The format is either plain text or HTML dependent on what
     * has been requested. Even the plain text representation may differ from the
     * text originally posted in that it may replace video links with video titles etc.
     */
    textDisplay: string | null

    /**
     * The comment's original raw text as initially posted or last updated. The
     * original text will only be returned if it is accessible to the viewer, which
     * is only guaranteed if the viewer is the comment's author.
     */
    textOriginal: string | null

    /**
     * The date and time when was last updated . The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    updatedAt: string | null

    /**
     * The ID of the video the comment refers to, if any.
     */
    videoId: string | null

    /**
     * The rating the viewer has given to this comment. For the time being this will
     * never return RATE_TYPE_DISLIKE and instead return RATE_TYPE_NONE. This may
     * change in the future.
     */
    viewerRating: string | null
  }

  /**
   * Basic details about a comment thread.
   */
  interface ICommentThreadSnippet {
    __typename: 'CommentThreadSnippet'

    /**
     * Whether the current viewer of the thread can reply to it. This is viewer
     * specific - other viewers may see a different value for this field.
     */
    canReply: boolean | null

    /**
     * The YouTube channel the comments in the thread refer to or the channel with
     * the video the comments refer to. If video_id isn't set the comments refer to
     * the channel itself.
     */
    channelId: string | null

    /**
     * Whether the thread (and therefore all its comments) is visible to all YouTube users.
     */
    isPublic: boolean | null

    /**
     * The top level comment of this thread.
     */
    topLevelComment: IComment | null

    /**
     * The total number of replies (not including the top level comment).
     */
    totalReplyCount: number | null

    /**
     * The ID of the video the comments refer to, if any. No video_id implies a channel discussion comment.
     */
    videoId: string | null
  }

  interface IComments {
    __typename: 'Comments_'

    /**
     * Returns a list of comments that match the API request parameters.
     */
    list: ICommentListResponse | null
  }

  interface IListOnCommentsArguments {
    /**
     * The id parameter specifies a comma-separated list of comment IDs for the
     * resources that are being retrieved. In a comment resource, the id property
     * specifies the comment's ID.
     */
    id?: string | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     *
     * Note: This parameter is not supported for use in conjunction with the id parameter.
     */
    maxResults?: number | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken property
     * identifies the next page of the result that can be retrieved.
     *
     * Note: This parameter is not supported for use in conjunction with the id parameter.
     */
    pageToken?: string | null

    /**
     * The parentId parameter specifies the ID of the comment for which replies should be retrieved.
     *
     * Note: YouTube currently supports replies only for top-level comments.
     * However, replies to replies may be supported in the future.
     */
    parentId?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more comment
     * resource properties that the API response will include.
     */
    part: string

    /**
     * This parameter indicates whether the API should return comments formatted as HTML or as plain text.
     */
    textFormat?: TextFormatCommentsEnumParam | null
  }

  const enum TextFormatCommentsEnumParam {
    /**
     * Returns the comments in HTML format. This is the default value.
     */
    html = 'html',

    /**
     * Returns the comments in plain text format.
     */
    plainText = 'plainText'
  }

  interface ICommentListResponse {
    __typename: 'CommentListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of comments that match the request criteria.
     */
    items: Array<IComment | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#commentListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  interface IGuideCategories {
    __typename: 'GuideCategories_'

    /**
     * Returns a list of categories that can be associated with YouTube channels.
     */
    list: IGuideCategoryListResponse | null
  }

  interface IListOnGuideCategoriesArguments {
    /**
     * The hl parameter specifies the language that will be used for text values in the API response.
     */
    hl?: string | null

    /**
     * The id parameter specifies a comma-separated list of the YouTube channel
     * category ID(s) for the resource(s) that are being retrieved. In a
     * guideCategory resource, the id property specifies the YouTube channel category ID.
     */
    id?: string | null

    /**
     * The part parameter specifies the guideCategory resource properties that the
     * API response will include. Set the parameter value to snippet.
     */
    part: string

    /**
     * The regionCode parameter instructs the API to return the list of guide
     * categories available in the specified country. The parameter value is an ISO
     * 3166-1 alpha-2 country code.
     */
    regionCode?: string | null
  }

  interface IGuideCategoryListResponse {
    __typename: 'GuideCategoryListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of categories that can be associated with YouTube channels. In this
     * map, the category ID is the map key, and its value is the corresponding
     * guideCategory resource.
     */
    items: Array<IGuideCategory | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#guideCategoryListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A guideCategory resource identifies a category that YouTube algorithmically
   * assigns based on a channel's content or other indicators, such as the channel's
   * popularity. The list is similar to video categories, with the difference being
   * that a video's uploader can assign a video category but only YouTube can assign
   * a channel category.
   */
  interface IGuideCategory {
    __typename: 'GuideCategory'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the guide category.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#guideCategory".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the category, such as its title.
     */
    snippet: IGuideCategorySnippet | null
  }

  /**
   * Basic details about a guide category.
   */
  interface IGuideCategorySnippet {
    __typename: 'GuideCategorySnippet'
    channelId: string | null

    /**
     * Description of the guide category.
     */
    title: string | null
  }

  interface II18nLanguages {
    __typename: 'I18nLanguages_'

    /**
     * Returns a list of application languages that the YouTube website supports.
     */
    list: II18nLanguageListResponse | null
  }

  interface IListOnI18nLanguagesArguments {
    /**
     * The hl parameter specifies the language that should be used for text values in the API response.
     */
    hl?: string | null

    /**
     * The part parameter specifies the i18nLanguage resource properties that the
     * API response will include. Set the parameter value to snippet.
     */
    part: string
  }

  interface II18nLanguageListResponse {
    __typename: 'I18nLanguageListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of supported i18n languages. In this map, the i18n language ID is the
     * map key, and its value is the corresponding i18nLanguage resource.
     */
    items: Array<II18nLanguage | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#i18nLanguageListResponse".
     */
    kind: string | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * An i18nLanguage resource identifies a UI language currently supported by YouTube.
   */
  interface II18nLanguage {
    __typename: 'I18nLanguage'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the i18n language.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#i18nLanguage".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the i18n language, such as language code and human-readable name.
     */
    snippet: II18nLanguageSnippet | null
  }

  /**
   * Basic details about an i18n language, such as language code and human-readable name.
   */
  interface II18nLanguageSnippet {
    __typename: 'I18nLanguageSnippet'

    /**
     * A short BCP-47 code that uniquely identifies a language.
     */
    hl: string | null

    /**
     * The human-readable name of the language in the language itself.
     */
    name: string | null
  }

  interface II18nRegions {
    __typename: 'I18nRegions_'

    /**
     * Returns a list of content regions that the YouTube website supports.
     */
    list: II18nRegionListResponse | null
  }

  interface IListOnI18nRegionsArguments {
    /**
     * The hl parameter specifies the language that should be used for text values in the API response.
     */
    hl?: string | null

    /**
     * The part parameter specifies the i18nRegion resource properties that the API
     * response will include. Set the parameter value to snippet.
     */
    part: string
  }

  interface II18nRegionListResponse {
    __typename: 'I18nRegionListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of regions where YouTube is available. In this map, the i18n region ID
     * is the map key, and its value is the corresponding i18nRegion resource.
     */
    items: Array<II18nRegion | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#i18nRegionListResponse".
     */
    kind: string | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A i18nRegion resource identifies a region where YouTube is available.
   */
  interface II18nRegion {
    __typename: 'I18nRegion'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the i18n region.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#i18nRegion".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the i18n region, such as region code and human-readable name.
     */
    snippet: II18nRegionSnippet | null
  }

  /**
   * Basic details about an i18n region, such as region code and human-readable name.
   */
  interface II18nRegionSnippet {
    __typename: 'I18nRegionSnippet'

    /**
     * The region code as a 2-letter ISO country code.
     */
    gl: string | null

    /**
     * The human-readable name of the region.
     */
    name: string | null
  }

  interface ILiveBroadcasts {
    __typename: 'LiveBroadcasts_'

    /**
     * Returns a list of YouTube broadcasts that match the API request parameters.
     */
    list: ILiveBroadcastListResponse | null
  }

  interface IListOnLiveBroadcastsArguments {
    /**
     * The broadcastStatus parameter filters the API response to only include broadcasts with the specified status.
     */
    broadcastStatus?: BroadcastStatusLiveBroadcastsEnumParam | null

    /**
     * The broadcastType parameter filters the API response to only include
     * broadcasts with the specified type. This is only compatible with the mine
     * filter for now.
     */
    broadcastType?: BroadcastTypeLiveBroadcastsEnumParam | null

    /**
     * The id parameter specifies a comma-separated list of YouTube broadcast IDs
     * that identify the broadcasts being retrieved. In a liveBroadcast resource,
     * the id property specifies the broadcast's ID.
     */
    id?: string | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * The mine parameter can be used to instruct the API to only return broadcasts
     * owned by the authenticated user. Set the parameter value to true to only
     * retrieve your own broadcasts.
     */
    mine?: boolean | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The CMS account that
     * the user authenticates with must be linked to the specified YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null

    /**
     * This parameter can only be used in a properly authorized request. Note: This
     * parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwnerChannel parameter specifies the YouTube channel ID
     * of the channel to which a video is being added. This parameter is required
     * when a request specifies a value for the onBehalfOfContentOwner parameter,
     * and it can only be used in conjunction with that parameter. In addition, the
     * request must be authorized using a CMS account that is linked to the content
     * owner that the onBehalfOfContentOwner parameter specifies. Finally, the
     * channel that the onBehalfOfContentOwnerChannel parameter value specifies
     * must be linked to the content owner that the onBehalfOfContentOwner
     * parameter specifies.
     *
     * This parameter is intended for YouTube content partners that own and manage
     * many different YouTube channels. It allows content owners to authenticate
     * once and perform actions on behalf of the channel specified in the parameter
     * value, without having to provide authentication credentials for each
     * separate channel.
     */
    onBehalfOfContentOwnerChannel?: string | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more
     * liveBroadcast resource properties that the API response will include. The
     * part names that you can include in the parameter value are id, snippet,
     * contentDetails, and status.
     */
    part: string
  }

  const enum BroadcastStatusLiveBroadcastsEnumParam {
    /**
     * Return current live broadcasts.
     */
    active = 'active',

    /**
     * Return all broadcasts.
     */
    all = 'all',

    /**
     * Return broadcasts that have already ended.
     */
    completed = 'completed',

    /**
     * Return broadcasts that have not yet started.
     */
    upcoming = 'upcoming'
  }

  const enum BroadcastTypeLiveBroadcastsEnumParam {
    /**
     * Return all broadcasts.
     */
    all = 'all',

    /**
     * Return only scheduled event broadcasts.
     */
    event = 'event',

    /**
     * Return only persistent broadcasts.
     */
    persistent = 'persistent'
  }

  interface ILiveBroadcastListResponse {
    __typename: 'LiveBroadcastListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of broadcasts that match the request criteria.
     */
    items: Array<ILiveBroadcast | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#liveBroadcastListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A liveBroadcast resource represents an event that will be streamed, via live video, on YouTube.
   */
  interface ILiveBroadcast {
    __typename: 'LiveBroadcast'

    /**
     * The contentDetails object contains information about the event's video
     * content, such as whether the content can be shown in an embedded video player
     * or if it will be archived and therefore available for viewing after the event has concluded.
     */
    contentDetails: ILiveBroadcastContentDetails | null

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube assigns to uniquely identify the broadcast.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#liveBroadcast".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the event, including its title, description, start time, and end time.
     */
    snippet: ILiveBroadcastSnippet | null

    /**
     * The statistics object contains info about the event's current stats. These
     * include concurrent viewers and total chat count. Statistics can change (in
     * either direction) during the lifetime of an event. Statistics are only
     * returned while the event is live.
     */
    statistics: ILiveBroadcastStatistics | null

    /**
     * The status object contains information about the event's status.
     */
    status: ILiveBroadcastStatus | null
  }

  /**
   * Detailed settings of a broadcast.
   */
  interface ILiveBroadcastContentDetails {
    __typename: 'LiveBroadcastContentDetails'

    /**
     * This value uniquely identifies the live stream bound to the broadcast.
     */
    boundStreamId: string | null

    /**
     * The date and time that the live stream referenced by boundStreamId was last updated.
     */
    boundStreamLastUpdateTimeMs: string | null
    closedCaptionsType: string | null

    /**
     * This setting indicates whether auto start is enabled for this broadcast.
     */
    enableAutoStart: boolean | null

    /**
     * This setting indicates whether HTTP POST closed captioning is enabled for this
     * broadcast. The ingestion URL of the closed captions is returned through the
     * liveStreams API. This is mutually exclusive with using the
     * closed_captions_type property, and is equivalent to setting
     * closed_captions_type to CLOSED_CAPTIONS_HTTP_POST.
     */
    enableClosedCaptions: boolean | null

    /**
     * This setting indicates whether YouTube should enable content encryption for the broadcast.
     */
    enableContentEncryption: boolean | null

    /**
     * This setting determines whether viewers can access DVR controls while watching
     * the video. DVR controls enable the viewer to control the video playback
     * experience by pausing, rewinding, or fast forwarding content. The default
     * value for this property is true.
     *
     *
     *
     * Important: You must set the value to true and also set the enableArchive
     * property's value to true if you want to make playback available immediately
     * after the broadcast ends.
     */
    enableDvr: boolean | null

    /**
     * This setting indicates whether the broadcast video can be played in an
     * embedded player. If you choose to archive the video (using the enableArchive
     * property), this setting will also apply to the archived video.
     */
    enableEmbed: boolean | null

    /**
     * Indicates whether this broadcast has low latency enabled.
     */
    enableLowLatency: boolean | null

    /**
     * If both this and enable_low_latency are set, they must match. LATENCY_NORMAL
     * should match enable_low_latency=false LATENCY_LOW should match
     * enable_low_latency=true LATENCY_ULTRA_LOW should have enable_low_latency omitted.
     */
    latencyPreference: string | null
    mesh: string | null

    /**
     * The monitorStream object contains information about the monitor stream, which
     * the broadcaster can use to review the event content before the broadcast
     * stream is shown publicly.
     */
    monitorStream: IMonitorStreamInfo | null

    /**
     * The projection format of this broadcast. This defaults to rectangular.
     */
    projection: string | null

    /**
     * Automatically start recording after the event goes live. The default value for this property is true.
     *
     *
     *
     * Important: You must also set the enableDvr property's value to true if you
     * want the playback to be available immediately after the broadcast ends. If you
     * set this property's value to true but do not also set the enableDvr property
     * to true, there may be a delay of around one day before the archived video will
     * be available for playback.
     */
    recordFromStart: boolean | null

    /**
     * This setting indicates whether the broadcast should automatically begin with
     * an in-stream slate when you update the broadcast's status to live. After
     * updating the status, you then need to send a liveCuepoints.insert request that
     * sets the cuepoint's eventState to end to remove the in-stream slate and make
     * your broadcast stream visible to viewers.
     */
    startWithSlate: boolean | null
    stereoLayout: string | null
  }

  /**
   * Settings and Info of the monitor stream
   */
  interface IMonitorStreamInfo {
    __typename: 'MonitorStreamInfo'

    /**
     * If you have set the enableMonitorStream property to true, then this property
     * determines the length of the live broadcast delay.
     */
    broadcastStreamDelayMs: number | null

    /**
     * HTML code that embeds a player that plays the monitor stream.
     */
    embedHtml: string | null

    /**
     * This value determines whether the monitor stream is enabled for the broadcast.
     * If the monitor stream is enabled, then YouTube will broadcast the event
     * content on a special stream intended only for the broadcaster's consumption.
     * The broadcaster can use the stream to review the event content and also to
     * identify the optimal times to insert cuepoints.
     *
     * You need to set this value to true if you intend to have a broadcast delay for your event.
     *
     * Note: This property cannot be updated once the broadcast is in the testing or live state.
     */
    enableMonitorStream: boolean | null
  }

  interface ILiveBroadcastSnippet {
    __typename: 'LiveBroadcastSnippet'

    /**
     * The date and time that the broadcast actually ended. This information is only
     * available once the broadcast's state is complete. The value is specified in
     * ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    actualEndTime: string | null

    /**
     * The date and time that the broadcast actually started. This information is
     * only available once the broadcast's state is live. The value is specified in
     * ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    actualStartTime: string | null

    /**
     * The ID that YouTube uses to uniquely identify the channel that is publishing the broadcast.
     */
    channelId: string | null

    /**
     * The broadcast's description. As with the title, you can set this field by
     * modifying the broadcast resource or by setting the description field of the
     * corresponding video resource.
     */
    description: string | null
    isDefaultBroadcast: boolean | null

    /**
     * The id of the live chat for this broadcast.
     */
    liveChatId: string | null

    /**
     * The date and time that the broadcast was added to YouTube's live broadcast
     * schedule. The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAt: string | null

    /**
     * The date and time that the broadcast is scheduled to end. The value is
     * specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    scheduledEndTime: string | null

    /**
     * The date and time that the broadcast is scheduled to start. The value is
     * specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    scheduledStartTime: string | null

    /**
     * A map of thumbnail images associated with the broadcast. For each nested
     * object in this object, the key is the name of the thumbnail image, and the
     * value is an object that contains other information about the thumbnail.
     */
    thumbnails: IThumbnailDetails | null

    /**
     * The broadcast's title. Note that the broadcast represents exactly one YouTube
     * video. You can set this field by modifying the broadcast resource or by
     * setting the title field of the corresponding video resource.
     */
    title: string | null
  }

  /**
   * Statistics about the live broadcast. These represent a snapshot of the values at
   * the time of the request. Statistics are only returned for live broadcasts.
   */
  interface ILiveBroadcastStatistics {
    __typename: 'LiveBroadcastStatistics'

    /**
     * The number of viewers currently watching the broadcast. The property and its
     * value will be present if the broadcast has current viewers and the broadcast
     * owner has not hidden the viewcount for the video. Note that YouTube stops
     * tracking the number of concurrent viewers for a broadcast when the broadcast
     * ends. So, this property would not identify the number of viewers watching an
     * archived video of a live broadcast that already ended.
     */
    concurrentViewers: string | null

    /**
     * The total number of live chat messages currently on the broadcast. The
     * property and its value will be present if the broadcast is public, has the
     * live chat feature enabled, and has at least one message. Note that this field
     * will not be filled after the broadcast ends. So this property would not
     * identify the number of chat messages for an archived video of a completed live broadcast.
     */
    totalChatCount: string | null
  }

  interface ILiveBroadcastStatus {
    __typename: 'LiveBroadcastStatus'

    /**
     * The broadcast's status. The status can be updated using the API's liveBroadcasts.transition method.
     */
    lifeCycleStatus: string | null

    /**
     * Priority of the live broadcast event (internal state).
     */
    liveBroadcastPriority: string | null

    /**
     * The broadcast's privacy status. Note that the broadcast represents exactly one
     * YouTube video, so the privacy settings are identical to those supported for
     * videos. In addition, you can set this field by modifying the broadcast
     * resource or by setting the privacyStatus field of the corresponding video resource.
     */
    privacyStatus: string | null

    /**
     * The broadcast's recording status.
     */
    recordingStatus: string | null
  }

  interface ILiveChatMessages {
    __typename: 'LiveChatMessages_'

    /**
     * Lists live chat messages for a specific chat.
     */
    list: ILiveChatMessageListResponse | null
  }

  interface IListOnLiveChatMessagesArguments {
    /**
     * The hl parameter instructs the API to retrieve localized resource metadata
     * for a specific application language that the YouTube website supports. The
     * parameter value must be a language code included in the list returned by the
     * i18nLanguages.list method.
     *
     * If localized resource details are available in that language, the resource's
     * snippet.localized object will contain the localized values. However, if
     * localized details are not available, the snippet.localized object will
     * contain resource details in the resource's default language.
     */
    hl?: string | null

    /**
     * The liveChatId parameter specifies the ID of the chat whose messages will be returned.
     */
    liveChatId: string

    /**
     * The maxResults parameter specifies the maximum number of messages that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken property identify
     * other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies the liveChatComment resource parts that the API
     * response will include. Supported values are id and snippet.
     */
    part: string

    /**
     * The profileImageSize parameter specifies the size of the user profile
     * pictures that should be returned in the result set. Default: 88.
     */
    profileImageSize?: number | null
  }

  interface ILiveChatMessageListResponse {
    __typename: 'LiveChatMessageListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of live chat messages.
     */
    items: Array<ILiveChatMessage | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatMessageListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null

    /**
     * The date and time when the underlying stream went offline. The value is
     * specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    offlineAt: string | null
    pageInfo: IPageInfo | null

    /**
     * The amount of time the client should wait before polling again.
     */
    pollingIntervalMillis: number | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A liveChatMessage resource represents a chat message in a YouTube Live Chat.
   */
  interface ILiveChatMessage {
    __typename: 'LiveChatMessage'

    /**
     * The authorDetails object contains basic details about the user that posted this message.
     */
    authorDetails: ILiveChatMessageAuthorDetails | null

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube assigns to uniquely identify the message.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatMessage".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the message.
     */
    snippet: ILiveChatMessageSnippet | null
  }

  interface ILiveChatMessageAuthorDetails {
    __typename: 'LiveChatMessageAuthorDetails'

    /**
     * The YouTube channel ID.
     */
    channelId: string | null

    /**
     * The channel's URL.
     */
    channelUrl: string | null

    /**
     * The channel's display name.
     */
    displayName: string | null

    /**
     * Whether the author is a moderator of the live chat.
     */
    isChatModerator: boolean | null

    /**
     * Whether the author is the owner of the live chat.
     */
    isChatOwner: boolean | null

    /**
     * Whether the author is a sponsor of the live chat.
     */
    isChatSponsor: boolean | null

    /**
     * Whether the author's identity has been verified by YouTube.
     */
    isVerified: boolean | null

    /**
     * The channels's avatar URL.
     */
    profileImageUrl: string | null
  }

  interface ILiveChatMessageSnippet {
    __typename: 'LiveChatMessageSnippet'

    /**
     * The ID of the user that authored this message, this field is not always
     * filled. textMessageEvent - the user that wrote the message fanFundingEvent -
     * the user that funded the broadcast newSponsorEvent - the user that just became
     * a sponsor messageDeletedEvent - the moderator that took the action
     * messageRetractedEvent - the author that retracted their message
     * userBannedEvent - the moderator that took the action superChatEvent - the user
     * that made the purchase
     */
    authorChannelId: string | null

    /**
     * Contains a string that can be displayed to the user. If this field is not
     * present the message is silent, at the moment only messages of type TOMBSTONE
     * and CHAT_ENDED_EVENT are silent.
     */
    displayMessage: string | null

    /**
     * Details about the funding event, this is only set if the type is 'fanFundingEvent'.
     */
    fanFundingEventDetails: ILiveChatFanFundingEventDetails | null

    /**
     * Whether the message has display content that should be displayed to users.
     */
    hasDisplayContent: boolean | null
    liveChatId: string | null
    messageDeletedDetails: ILiveChatMessageDeletedDetails | null
    messageRetractedDetails: ILiveChatMessageRetractedDetails | null
    pollClosedDetails: ILiveChatPollClosedDetails | null
    pollEditedDetails: ILiveChatPollEditedDetails | null
    pollOpenedDetails: ILiveChatPollOpenedDetails | null
    pollVotedDetails: ILiveChatPollVotedDetails | null

    /**
     * The date and time when the message was orignally published. The value is
     * specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAt: string | null

    /**
     * Details about the Super Chat event, this is only set if the type is 'superChatEvent'.
     */
    superChatDetails: ILiveChatSuperChatDetails | null

    /**
     * Details about the text message, this is only set if the type is 'textMessageEvent'.
     */
    textMessageDetails: ILiveChatTextMessageDetails | null

    /**
     * The type of message, this will always be present, it determines the contents
     * of the message as well as which fields will be present.
     */
    type: string | null
    userBannedDetails: ILiveChatUserBannedMessageDetails | null
  }

  interface ILiveChatFanFundingEventDetails {
    __typename: 'LiveChatFanFundingEventDetails'

    /**
     * A rendered string that displays the fund amount and currency to the user.
     */
    amountDisplayString: string | null

    /**
     * The amount of the fund.
     */
    amountMicros: string | null

    /**
     * The currency in which the fund was made.
     */
    currency: string | null

    /**
     * The comment added by the user to this fan funding event.
     */
    userComment: string | null
  }

  interface ILiveChatMessageDeletedDetails {
    __typename: 'LiveChatMessageDeletedDetails'
    deletedMessageId: string | null
  }

  interface ILiveChatMessageRetractedDetails {
    __typename: 'LiveChatMessageRetractedDetails'
    retractedMessageId: string | null
  }

  interface ILiveChatPollClosedDetails {
    __typename: 'LiveChatPollClosedDetails'

    /**
     * The id of the poll that was closed.
     */
    pollId: string | null
  }

  interface ILiveChatPollEditedDetails {
    __typename: 'LiveChatPollEditedDetails'
    id: string | null
    items: Array<ILiveChatPollItem | null> | null
    prompt: string | null
  }

  interface ILiveChatPollItem {
    __typename: 'LiveChatPollItem'

    /**
     * Plain text description of the item.
     */
    description: string | null
    itemId: string | null
  }

  interface ILiveChatPollOpenedDetails {
    __typename: 'LiveChatPollOpenedDetails'
    id: string | null
    items: Array<ILiveChatPollItem | null> | null
    prompt: string | null
  }

  interface ILiveChatPollVotedDetails {
    __typename: 'LiveChatPollVotedDetails'

    /**
     * The poll item the user chose.
     */
    itemId: string | null

    /**
     * The poll the user voted on.
     */
    pollId: string | null
  }

  interface ILiveChatSuperChatDetails {
    __typename: 'LiveChatSuperChatDetails'

    /**
     * A rendered string that displays the fund amount and currency to the user.
     */
    amountDisplayString: string | null

    /**
     * The amount purchased by the user, in micros (1,750,000 micros = 1.75).
     */
    amountMicros: string | null

    /**
     * The currency in which the purchase was made.
     */
    currency: string | null

    /**
     * The tier in which the amount belongs to. Lower amounts belong to lower tiers. Starts at 1.
     */
    tier: number | null

    /**
     * The comment added by the user to this Super Chat event.
     */
    userComment: string | null
  }

  interface ILiveChatTextMessageDetails {
    __typename: 'LiveChatTextMessageDetails'

    /**
     * The user's message.
     */
    messageText: string | null
  }

  interface ILiveChatUserBannedMessageDetails {
    __typename: 'LiveChatUserBannedMessageDetails'

    /**
     * The duration of the ban. This property is only present if the banType is temporary.
     */
    banDurationSeconds: string | null

    /**
     * The type of ban.
     */
    banType: string | null

    /**
     * The details of the user that was banned.
     */
    bannedUserDetails: IChannelProfileDetails | null
  }

  interface IChannelProfileDetails {
    __typename: 'ChannelProfileDetails'

    /**
     * The YouTube channel ID.
     */
    channelId: string | null

    /**
     * The channel's URL.
     */
    channelUrl: string | null

    /**
     * The channel's display name.
     */
    displayName: string | null

    /**
     * The channels's avatar URL.
     */
    profileImageUrl: string | null
  }

  interface ILiveChatModerators {
    __typename: 'LiveChatModerators_'

    /**
     * Lists moderators for a live chat.
     */
    list: ILiveChatModeratorListResponse | null
  }

  interface IListOnLiveChatModeratorsArguments {
    /**
     * The liveChatId parameter specifies the YouTube live chat for which the API should return moderators.
     */
    liveChatId: string

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies the liveChatModerator resource parts that the
     * API response will include. Supported values are id and snippet.
     */
    part: string
  }

  interface ILiveChatModeratorListResponse {
    __typename: 'LiveChatModeratorListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of moderators that match the request criteria.
     */
    items: Array<ILiveChatModerator | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatModeratorListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A liveChatModerator resource represents a moderator for a YouTube live chat. A
   * chat moderator has the ability to ban/unban users from a chat, remove message, etc.
   */
  interface ILiveChatModerator {
    __typename: 'LiveChatModerator'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube assigns to uniquely identify the moderator.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatModerator".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the moderator.
     */
    snippet: ILiveChatModeratorSnippet | null
  }

  interface ILiveChatModeratorSnippet {
    __typename: 'LiveChatModeratorSnippet'

    /**
     * The ID of the live chat this moderator can act on.
     */
    liveChatId: string | null

    /**
     * Details about the moderator.
     */
    moderatorDetails: IChannelProfileDetails | null
  }

  interface ILiveStreams {
    __typename: 'LiveStreams_'

    /**
     * Returns a list of video streams that match the API request parameters.
     */
    list: ILiveStreamListResponse | null
  }

  interface IListOnLiveStreamsArguments {
    /**
     * The id parameter specifies a comma-separated list of YouTube stream IDs that
     * identify the streams being retrieved. In a liveStream resource, the id
     * property specifies the stream's ID.
     */
    id?: string | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * The mine parameter can be used to instruct the API to only return streams
     * owned by the authenticated user. Set the parameter value to true to only
     * retrieve your own streams.
     */
    mine?: boolean | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The CMS account that
     * the user authenticates with must be linked to the specified YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null

    /**
     * This parameter can only be used in a properly authorized request. Note: This
     * parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwnerChannel parameter specifies the YouTube channel ID
     * of the channel to which a video is being added. This parameter is required
     * when a request specifies a value for the onBehalfOfContentOwner parameter,
     * and it can only be used in conjunction with that parameter. In addition, the
     * request must be authorized using a CMS account that is linked to the content
     * owner that the onBehalfOfContentOwner parameter specifies. Finally, the
     * channel that the onBehalfOfContentOwnerChannel parameter value specifies
     * must be linked to the content owner that the onBehalfOfContentOwner
     * parameter specifies.
     *
     * This parameter is intended for YouTube content partners that own and manage
     * many different YouTube channels. It allows content owners to authenticate
     * once and perform actions on behalf of the channel specified in the parameter
     * value, without having to provide authentication credentials for each
     * separate channel.
     */
    onBehalfOfContentOwnerChannel?: string | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more
     * liveStream resource properties that the API response will include. The part
     * names that you can include in the parameter value are id, snippet, cdn, and status.
     */
    part: string
  }

  interface ILiveStreamListResponse {
    __typename: 'LiveStreamListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of live streams that match the request criteria.
     */
    items: Array<ILiveStream | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#liveStreamListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A live stream describes a live ingestion point.
   */
  interface ILiveStream {
    __typename: 'LiveStream'

    /**
     * The cdn object defines the live stream's content delivery network (CDN)
     * settings. These settings provide details about the manner in which you stream
     * your content to YouTube.
     */
    cdn: ICdnSettings | null

    /**
     * The content_details object contains information about the stream, including the closed captions ingestion URL.
     */
    contentDetails: ILiveStreamContentDetails | null

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube assigns to uniquely identify the stream.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#liveStream".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the stream, including its channel, title, and description.
     */
    snippet: ILiveStreamSnippet | null

    /**
     * The status object contains information about live stream's status.
     */
    status: ILiveStreamStatus | null
  }

  /**
   * Brief description of the live stream cdn settings.
   */
  interface ICdnSettings {
    __typename: 'CdnSettings'

    /**
     * The format of the video stream that you are sending to Youtube.
     */
    format: string | null

    /**
     * The frame rate of the inbound video data.
     */
    frameRate: string | null

    /**
     * The ingestionInfo object contains information that YouTube provides that you
     * need to transmit your RTMP or HTTP stream to YouTube.
     */
    ingestionInfo: IIngestionInfo | null

    /**
     * The method or protocol used to transmit the video stream.
     */
    ingestionType: string | null

    /**
     * The resolution of the inbound video data.
     */
    resolution: string | null
  }

  /**
   * Describes information necessary for ingesting an RTMP or an HTTP stream.
   */
  interface IIngestionInfo {
    __typename: 'IngestionInfo'

    /**
     * The backup ingestion URL that you should use to stream video to YouTube. You
     * have the option of simultaneously streaming the content that you are sending
     * to the ingestionAddress to this URL.
     */
    backupIngestionAddress: string | null

    /**
     * The primary ingestion URL that you should use to stream video to YouTube. You must stream video to this URL.
     *
     * Depending on which application or tool you use to encode your video stream,
     * you may need to enter the stream URL and stream name separately or you may
     * need to concatenate them in the following format:
     *
     * STREAM_URL/STREAM_NAME
     */
    ingestionAddress: string | null

    /**
     * The HTTP or RTMP stream name that YouTube assigns to the video stream.
     */
    streamName: string | null
  }

  /**
   * Detailed settings of a stream.
   */
  interface ILiveStreamContentDetails {
    __typename: 'LiveStreamContentDetails'

    /**
     * The ingestion URL where the closed captions of this stream are sent.
     */
    closedCaptionsIngestionUrl: string | null

    /**
     * Indicates whether the stream is reusable, which means that it can be bound to
     * multiple broadcasts. It is common for broadcasters to reuse the same stream
     * for many different broadcasts if those broadcasts occur at different times.
     *
     * If you set this value to false, then the stream will not be reusable, which
     * means that it can only be bound to one broadcast. Non-reusable streams differ
     * from reusable streams in the following ways:
     * - A non-reusable stream can only be bound to one broadcast.
     * - A non-reusable stream might be deleted by an automated process after the broadcast ends.
     * - The  liveStreams.list method does not list non-reusable streams if you call
     * the method and set the mine parameter to true. The only way to use that method
     * to retrieve the resource for a non-reusable stream is to use the id parameter
     * to identify the stream.
     */
    isReusable: boolean | null
  }

  interface ILiveStreamSnippet {
    __typename: 'LiveStreamSnippet'

    /**
     * The ID that YouTube uses to uniquely identify the channel that is transmitting the stream.
     */
    channelId: string | null

    /**
     * The stream's description. The value cannot be longer than 10000 characters.
     */
    description: string | null
    isDefaultStream: boolean | null

    /**
     * The date and time that the stream was created. The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAt: string | null

    /**
     * The stream's title. The value must be between 1 and 128 characters long.
     */
    title: string | null
  }

  /**
   * Brief description of the live stream status.
   */
  interface ILiveStreamStatus {
    __typename: 'LiveStreamStatus'

    /**
     * The health status of the stream.
     */
    healthStatus: ILiveStreamHealthStatus | null
    streamStatus: string | null
  }

  interface ILiveStreamHealthStatus {
    __typename: 'LiveStreamHealthStatus'

    /**
     * The configurations issues on this stream
     */
    configurationIssues: Array<ILiveStreamConfigurationIssue | null> | null

    /**
     * The last time this status was updated (in seconds)
     */
    lastUpdateTimeSeconds: string | null

    /**
     * The status code of this stream
     */
    status: string | null
  }

  interface ILiveStreamConfigurationIssue {
    __typename: 'LiveStreamConfigurationIssue'

    /**
     * The long-form description of the issue and how to resolve it.
     */
    description: string | null

    /**
     * The short-form reason for this issue.
     */
    reason: string | null

    /**
     * How severe this issue is to the stream.
     */
    severity: string | null

    /**
     * The kind of error happening.
     */
    type: string | null
  }

  interface IPlaylistItems {
    __typename: 'PlaylistItems_'

    /**
     * Returns a collection of playlist items that match the API request parameters.
     * You can retrieve all of the playlist items in a specified playlist or retrieve
     * one or more playlist items by their unique IDs.
     */
    list: IPlaylistItemListResponse | null
  }

  interface IListOnPlaylistItemsArguments {
    /**
     * The id parameter specifies a comma-separated list of one or more unique playlist item IDs.
     */
    id?: string | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The CMS account that
     * the user authenticates with must be linked to the specified YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more
     * playlistItem resource properties that the API response will include.
     *
     * If the parameter identifies a property that contains child properties, the
     * child properties will be included in the response. For example, in a
     * playlistItem resource, the snippet property contains numerous fields,
     * including the title, description, position, and resourceId properties. As
     * such, if you set part=snippet, the API response will contain all of those properties.
     */
    part: string

    /**
     * The playlistId parameter specifies the unique ID of the playlist for which
     * you want to retrieve playlist items. Note that even though this is an
     * optional parameter, every request to retrieve playlist items must specify a
     * value for either the id parameter or the playlistId parameter.
     */
    playlistId?: string | null

    /**
     * The videoId parameter specifies that the request should return only the playlist items that contain the specified video.
     */
    videoId?: string | null
  }

  interface IPlaylistItemListResponse {
    __typename: 'PlaylistItemListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of playlist items that match the request criteria.
     */
    items: Array<IPlaylistItem | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItemListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A playlistItem resource identifies another resource, such as a video, that is
   * included in a playlist. In addition, the playlistItem  resource contains details
   * about the included resource that pertain specifically to how that resource is
   * used in that playlist.
   *
   * YouTube uses playlists to identify special collections of videos for a channel, such as:
   * - uploaded videos
   * - favorite videos
   * - positively rated (liked) videos
   * - watch history
   * - watch later  To be more specific, these lists are associated with a channel,
   * which is a collection of a person, group, or company's videos, playlists, and
   * other YouTube information.
   *
   * You can retrieve the playlist IDs for each of these lists from the  channel
   * resource  for a given channel. You can then use the   playlistItems.list method
   * to retrieve any of those lists. You can also add or remove items from those
   * lists by calling the   playlistItems.insert and   playlistItems.delete methods.
   * For example, if a user gives a positive rating to a video, you would insert that
   * video into the liked videos playlist for that user's channel.
   */
  interface IPlaylistItem {
    __typename: 'PlaylistItem'

    /**
     * The contentDetails object is included in the resource if the included item is
     * a YouTube video. The object contains additional information about the video.
     */
    contentDetails: IPlaylistItemContentDetails | null

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the playlist item.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItem".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the playlist item, such as its title and position in the playlist.
     */
    snippet: IPlaylistItemSnippet | null

    /**
     * The status object contains information about the playlist item's privacy status.
     */
    status: IPlaylistItemStatus | null
  }

  interface IPlaylistItemContentDetails {
    __typename: 'PlaylistItemContentDetails'

    /**
     * The time, measured in seconds from the start of the video, when the video
     * should stop playing. (The playlist owner can specify the times when the video
     * should start and stop playing when the video is played in the context of the
     * playlist.) By default, assume that the video.endTime is the end of the video.
     */
    endAt: string | null

    /**
     * A user-generated note for this item.
     */
    note: string | null

    /**
     * The time, measured in seconds from the start of the video, when the video
     * should start playing. (The playlist owner can specify the times when the video
     * should start and stop playing when the video is played in the context of the
     * playlist.) The default value is 0.
     */
    startAt: string | null

    /**
     * The ID that YouTube uses to uniquely identify a video. To retrieve the video
     * resource, set the id query parameter to this value in your API request.
     */
    videoId: string | null

    /**
     * The date and time that the video was published to YouTube. The value is
     * specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    videoPublishedAt: string | null
  }

  /**
   * Basic details about a playlist, including title, description and thumbnails.
   */
  interface IPlaylistItemSnippet {
    __typename: 'PlaylistItemSnippet'

    /**
     * The ID that YouTube uses to uniquely identify the user that added the item to the playlist.
     */
    channelId: string | null

    /**
     * Channel title for the channel that the playlist item belongs to.
     */
    channelTitle: string | null

    /**
     * The item's description.
     */
    description: string | null

    /**
     * The ID that YouTube uses to uniquely identify the playlist that the playlist item is in.
     */
    playlistId: string | null

    /**
     * The order in which the item appears in the playlist. The value uses a
     * zero-based index, so the first item has a position of 0, the second item has a
     * position of 1, and so forth.
     */
    position: number | null

    /**
     * The date and time that the item was added to the playlist. The value is
     * specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAt: string | null

    /**
     * The id object contains information that can be used to uniquely identify the
     * resource that is included in the playlist as the playlist item.
     */
    resourceId: IResourceId | null

    /**
     * A map of thumbnail images associated with the playlist item. For each object
     * in the map, the key is the name of the thumbnail image, and the value is an
     * object that contains other information about the thumbnail.
     */
    thumbnails: IThumbnailDetails | null

    /**
     * The item's title.
     */
    title: string | null
  }

  /**
   * Information about the playlist item's privacy status.
   */
  interface IPlaylistItemStatus {
    __typename: 'PlaylistItemStatus'

    /**
     * This resource's privacy status.
     */
    privacyStatus: string | null
  }

  interface IPlaylists {
    __typename: 'Playlists_'

    /**
     * Returns a collection of playlists that match the API request parameters. For
     * example, you can retrieve all playlists that the authenticated user owns, or
     * you can retrieve one or more playlists by their unique IDs.
     */
    list: IPlaylistListResponse | null
  }

  interface IListOnPlaylistsArguments {
    /**
     * This value indicates that the API should only return the specified channel's playlists.
     */
    channelId?: string | null

    /**
     * The hl parameter should be used for filter out the properties that are not
     * in the given language. Used for the snippet part.
     */
    hl?: string | null

    /**
     * The id parameter specifies a comma-separated list of the YouTube playlist
     * ID(s) for the resource(s) that are being retrieved. In a playlist resource,
     * the id property specifies the playlist's YouTube playlist ID.
     */
    id?: string | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * Set this parameter's value to true to instruct the API to only return playlists owned by the authenticated user.
     */
    mine?: boolean | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The CMS account that
     * the user authenticates with must be linked to the specified YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null

    /**
     * This parameter can only be used in a properly authorized request. Note: This
     * parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwnerChannel parameter specifies the YouTube channel ID
     * of the channel to which a video is being added. This parameter is required
     * when a request specifies a value for the onBehalfOfContentOwner parameter,
     * and it can only be used in conjunction with that parameter. In addition, the
     * request must be authorized using a CMS account that is linked to the content
     * owner that the onBehalfOfContentOwner parameter specifies. Finally, the
     * channel that the onBehalfOfContentOwnerChannel parameter value specifies
     * must be linked to the content owner that the onBehalfOfContentOwner
     * parameter specifies.
     *
     * This parameter is intended for YouTube content partners that own and manage
     * many different YouTube channels. It allows content owners to authenticate
     * once and perform actions on behalf of the channel specified in the parameter
     * value, without having to provide authentication credentials for each
     * separate channel.
     */
    onBehalfOfContentOwnerChannel?: string | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more playlist
     * resource properties that the API response will include.
     *
     * If the parameter identifies a property that contains child properties, the
     * child properties will be included in the response. For example, in a
     * playlist resource, the snippet property contains properties like author,
     * title, description, tags, and timeCreated. As such, if you set part=snippet,
     * the API response will contain all of those properties.
     */
    part: string
  }

  interface IPlaylistListResponse {
    __typename: 'PlaylistListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of playlists that match the request criteria.
     */
    items: Array<IPlaylist | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#playlistListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A playlist resource represents a YouTube playlist. A playlist is a collection of
   * videos that can be viewed sequentially and shared with other users. A playlist
   * can contain up to 200 videos, and YouTube does not limit the number of playlists
   * that each user creates. By default, playlists are publicly visible to other
   * users, but playlists can be public or private.
   *
   * YouTube also uses playlists to identify special collections of videos for a channel, such as:
   * - uploaded videos
   * - favorite videos
   * - positively rated (liked) videos
   * - watch history
   * - watch later  To be more specific, these lists are associated with a channel,
   * which is a collection of a person, group, or company's videos, playlists, and
   * other YouTube information. You can retrieve the playlist IDs for each of these
   * lists from the  channel resource for a given channel.
   *
   * You can then use the   playlistItems.list method to retrieve any of those lists.
   * You can also add or remove items from those lists by calling the
   * playlistItems.insert and   playlistItems.delete methods.
   */
  interface IPlaylist {
    __typename: 'Playlist'

    /**
     * The contentDetails object contains information like video count.
     */
    contentDetails: IPlaylistContentDetails | null

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the playlist.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#playlist".
     */
    kind: string | null

    /**
     * The player object contains information that you would use to play the playlist in an embedded player.
     */
    player: IPlaylistPlayer | null

    /**
     * The snippet object contains basic details about the playlist, such as its title and description.
     */
    snippet: IPlaylistSnippet | null

    /**
     * The status object contains status information for the playlist.
     */
    status: IPlaylistStatus | null
  }

  interface IPlaylistContentDetails {
    __typename: 'PlaylistContentDetails'

    /**
     * The number of videos in the playlist.
     */
    itemCount: number | null
  }

  interface IPlaylistPlayer {
    __typename: 'PlaylistPlayer'

    /**
     * An <iframe> tag that embeds a player that will play the playlist.
     */
    embedHtml: string | null
  }

  /**
   * Basic details about a playlist, including title, description and thumbnails.
   */
  interface IPlaylistSnippet {
    __typename: 'PlaylistSnippet'

    /**
     * The ID that YouTube uses to uniquely identify the channel that published the playlist.
     */
    channelId: string | null

    /**
     * The channel title of the channel that the video belongs to.
     */
    channelTitle: string | null

    /**
     * The language of the playlist's default title and description.
     */
    defaultLanguage: string | null

    /**
     * The playlist's description.
     */
    description: string | null

    /**
     * Localized title and description, read-only.
     */
    localized: IPlaylistLocalization | null

    /**
     * The date and time that the playlist was created. The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAt: string | null

    /**
     * Keyword tags associated with the playlist.
     */
    tags: Array<string | null> | null

    /**
     * A map of thumbnail images associated with the playlist. For each object in the
     * map, the key is the name of the thumbnail image, and the value is an object
     * that contains other information about the thumbnail.
     */
    thumbnails: IThumbnailDetails | null

    /**
     * The playlist's title.
     */
    title: string | null
  }

  /**
   * Playlist localization setting
   */
  interface IPlaylistLocalization {
    __typename: 'PlaylistLocalization'

    /**
     * The localized strings for playlist's description.
     */
    description: string | null

    /**
     * The localized strings for playlist's title.
     */
    title: string | null
  }

  interface IPlaylistStatus {
    __typename: 'PlaylistStatus'

    /**
     * The playlist's privacy status.
     */
    privacyStatus: string | null
  }

  interface ISearch {
    __typename: 'Search_'

    /**
     * Returns a collection of search results that match the query parameters
     * specified in the API request. By default, a search result set identifies
     * matching video, channel, and playlist resources, but you can also configure
     * queries to only retrieve a specific type of resource.
     */
    list: ISearchListResponse | null
  }

  interface IListOnSearchArguments {
    /**
     * The channelId parameter indicates that the API response should only contain resources created by the channel
     */
    channelId?: string | null

    /**
     * The channelType parameter lets you restrict a search to a particular type of channel.
     */
    channelType?: ChannelTypeSearchEnumParam | null

    /**
     * The eventType parameter restricts a search to broadcast events. If you
     * specify a value for this parameter, you must also set the type parameter's
     * value to video.
     */
    eventType?: EventTypeSearchEnumParam | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The forContentOwner parameter restricts the search to only retrieve
     * resources owned by the content owner specified by the onBehalfOfContentOwner
     * parameter. The user must be authenticated using a CMS account linked to the
     * specified content owner and onBehalfOfContentOwner must be provided.
     */
    forContentOwner?: boolean | null

    /**
     * The forDeveloper parameter restricts the search to only retrieve videos
     * uploaded via the developer's application or website. The API server uses the
     * request's authorization credentials to identify the developer. Therefore, a
     * developer can restrict results to videos uploaded through the developer's
     * own app or website but not to videos uploaded through other apps or sites.
     */
    forDeveloper?: boolean | null

    /**
     * The forMine parameter restricts the search to only retrieve videos owned by
     * the authenticated user. If you set this parameter to true, then the type
     * parameter's value must also be set to video.
     */
    forMine?: boolean | null

    /**
     * The location parameter, in conjunction with the locationRadius parameter,
     * defines a circular geographic area and also restricts a search to videos
     * that specify, in their metadata, a geographic location that falls within
     * that area. The parameter value is a string that specifies latitude/longitude
     * coordinates e.g. (37.42307,-122.08427).
     *
     *
     * - The location parameter value identifies the point at the center of the area.
     * - The locationRadius parameter specifies the maximum distance that the
     * location associated with a video can be from that point for the video to
     * still be included in the search results.The API returns an error if your
     * request specifies a value for the location parameter but does not also
     * specify a value for the locationRadius parameter.
     */
    location?: string | null

    /**
     * The locationRadius parameter, in conjunction with the location parameter, defines a circular geographic area.
     *
     * The parameter value must be a floating point number followed by a
     * measurement unit. Valid measurement units are m, km, ft, and mi. For
     * example, valid parameter values include 1500m, 5km, 10000ft, and 0.75mi. The
     * API does not support locationRadius parameter values larger than 1000 kilometers.
     *
     * Note: See the definition of the location parameter for more information.
     */
    locationRadius?: string | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The CMS account that
     * the user authenticates with must be linked to the specified YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null

    /**
     * The order parameter specifies the method that will be used to order resources in the API response.
     */
    order?: OrderSearchEnumParam | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more search
     * resource properties that the API response will include. Set the parameter
     * value to snippet.
     */
    part: string

    /**
     * The publishedAfter parameter indicates that the API response should only
     * contain resources created after the specified time. The value is an RFC 3339
     * formatted date-time value (1970-01-01T00:00:00Z).
     */
    publishedAfter?: string | null

    /**
     * The publishedBefore parameter indicates that the API response should only
     * contain resources created before the specified time. The value is an RFC
     * 3339 formatted date-time value (1970-01-01T00:00:00Z).
     */
    publishedBefore?: string | null

    /**
     * The q parameter specifies the query term to search for.
     *
     * Your request can also use the Boolean NOT (-) and OR (|) operators to
     * exclude videos or to find videos that are associated with one of several
     * search terms. For example, to search for videos matching either "boating" or
     * "sailing", set the q parameter value to boating|sailing. Similarly, to
     * search for videos matching either "boating" or "sailing" but not "fishing",
     * set the q parameter value to boating|sailing -fishing. Note that the pipe
     * character must be URL-escaped when it is sent in your API request. The
     * URL-escaped value for the pipe character is %7C.
     */
    q?: string | null

    /**
     * The regionCode parameter instructs the API to return search results for the
     * specified country. The parameter value is an ISO 3166-1 alpha-2 country code.
     */
    regionCode?: string | null

    /**
     * The relatedToVideoId parameter retrieves a list of videos that are related
     * to the video that the parameter value identifies. The parameter value must
     * be set to a YouTube video ID and, if you are using this parameter, the type
     * parameter must be set to video.
     */
    relatedToVideoId?: string | null

    /**
     * The relevanceLanguage parameter instructs the API to return search results
     * that are most relevant to the specified language. The parameter value is
     * typically an ISO 639-1 two-letter language code. However, you should use the
     * values zh-Hans for simplified Chinese and zh-Hant for traditional Chinese.
     * Please note that results in other languages will still be returned if they
     * are highly relevant to the search query term.
     */
    relevanceLanguage?: string | null

    /**
     * The safeSearch parameter indicates whether the search results should include
     * restricted content as well as standard content.
     */
    safeSearch?: SafeSearchSearchEnumParam | null

    /**
     * The topicId parameter indicates that the API response should only contain
     * resources associated with the specified topic. The value identifies a
     * Freebase topic ID.
     */
    topicId?: string | null

    /**
     * The type parameter restricts a search query to only retrieve a particular
     * type of resource. The value is a comma-separated list of resource types.
     */
    type?: string | null

    /**
     * The videoCaption parameter indicates whether the API should filter video
     * search results based on whether they have captions. If you specify a value
     * for this parameter, you must also set the type parameter's value to video.
     */
    videoCaption?: VideoCaptionSearchEnumParam | null

    /**
     * The videoCategoryId parameter filters video search results based on their
     * category. If you specify a value for this parameter, you must also set the
     * type parameter's value to video.
     */
    videoCategoryId?: string | null

    /**
     * The videoDefinition parameter lets you restrict a search to only include
     * either high definition (HD) or standard definition (SD) videos. HD videos
     * are available for playback in at least 720p, though higher resolutions, like
     * 1080p, might also be available. If you specify a value for this parameter,
     * you must also set the type parameter's value to video.
     */
    videoDefinition?: VideoDefinitionSearchEnumParam | null

    /**
     * The videoDimension parameter lets you restrict a search to only retrieve 2D
     * or 3D videos. If you specify a value for this parameter, you must also set
     * the type parameter's value to video.
     */
    videoDimension?: VideoDimensionSearchEnumParam | null

    /**
     * The videoDuration parameter filters video search results based on their
     * duration. If you specify a value for this parameter, you must also set the
     * type parameter's value to video.
     */
    videoDuration?: VideoDurationSearchEnumParam | null

    /**
     * The videoEmbeddable parameter lets you to restrict a search to only videos
     * that can be embedded into a webpage. If you specify a value for this
     * parameter, you must also set the type parameter's value to video.
     */
    videoEmbeddable?: VideoEmbeddableSearchEnumParam | null

    /**
     * The videoLicense parameter filters search results to only include videos
     * with a particular license. YouTube lets video uploaders choose to attach
     * either the Creative Commons license or the standard YouTube license to each
     * of their videos. If you specify a value for this parameter, you must also
     * set the type parameter's value to video.
     */
    videoLicense?: VideoLicenseSearchEnumParam | null

    /**
     * The videoSyndicated parameter lets you to restrict a search to only videos
     * that can be played outside youtube.com. If you specify a value for this
     * parameter, you must also set the type parameter's value to video.
     */
    videoSyndicated?: VideoSyndicatedSearchEnumParam | null

    /**
     * The videoType parameter lets you restrict a search to a particular type of
     * videos. If you specify a value for this parameter, you must also set the
     * type parameter's value to video.
     */
    videoType?: VideoTypeSearchEnumParam | null
  }

  const enum ChannelTypeSearchEnumParam {
    /**
     * Return all channels.
     */
    any = 'any',

    /**
     * Only retrieve shows.
     */
    show = 'show'
  }

  const enum EventTypeSearchEnumParam {
    /**
     * Only include completed broadcasts.
     */
    completed = 'completed',

    /**
     * Only include active broadcasts.
     */
    live = 'live',

    /**
     * Only include upcoming broadcasts.
     */
    upcoming = 'upcoming'
  }

  const enum OrderSearchEnumParam {
    /**
     * Resources are sorted in reverse chronological order based on the date they were created.
     */
    date = 'date',

    /**
     * Resources are sorted from highest to lowest rating.
     */
    rating = 'rating',

    /**
     * Resources are sorted based on their relevance to the search query. This is the default value for this parameter.
     */
    relevance = 'relevance',

    /**
     * Resources are sorted alphabetically by title.
     */
    title = 'title',

    /**
     * Channels are sorted in descending order of their number of uploaded videos.
     */
    videoCount = 'videoCount',

    /**
     * Resources are sorted from highest to lowest number of views.
     */
    viewCount = 'viewCount'
  }

  const enum SafeSearchSearchEnumParam {
    /**
     * YouTube will filter some content from search results and, at the least, will
     * filter content that is restricted in your locale. Based on their content,
     * search results could be removed from search results or demoted in search
     * results. This is the default parameter value.
     */
    moderate = 'moderate',

    /**
     * YouTube will not filter the search result set.
     */
    none = 'none',

    /**
     * YouTube will try to exclude all restricted content from the search result set.
     * Based on their content, search results could be removed from search results or
     * demoted in search results.
     */
    strict = 'strict'
  }

  const enum VideoCaptionSearchEnumParam {
    /**
     * Do not filter results based on caption availability.
     */
    any = 'any',

    /**
     * Only include videos that have captions.
     */
    closedCaption = 'closedCaption',

    /**
     * Only include videos that do not have captions.
     */
    none = 'none'
  }

  const enum VideoDefinitionSearchEnumParam {
    /**
     * Return all videos, regardless of their resolution.
     */
    any = 'any',

    /**
     * Only retrieve HD videos.
     */
    high = 'high',

    /**
     * Only retrieve videos in standard definition.
     */
    standard = 'standard'
  }

  const enum VideoDimensionSearchEnumParam {
    /**
     * Restrict search results to exclude 3D videos.
     */
    _2d = '_2d',

    /**
     * Restrict search results to only include 3D videos.
     */
    _3d = '_3d',

    /**
     * Include both 3D and non-3D videos in returned results. This is the default value.
     */
    any = 'any'
  }

  const enum VideoDurationSearchEnumParam {
    /**
     * Do not filter video search results based on their duration. This is the default value.
     */
    any = 'any',

    /**
     * Only include videos longer than 20 minutes.
     */
    long = 'long',

    /**
     * Only include videos that are between four and 20 minutes long (inclusive).
     */
    medium = 'medium',

    /**
     * Only include videos that are less than four minutes long.
     */
    short = 'short'
  }

  const enum VideoEmbeddableSearchEnumParam {
    /**
     * Return all videos, embeddable or not.
     */
    any = 'any',

    /**
     * Only retrieve embeddable videos.
     */
    TRUE = 'TRUE'
  }

  const enum VideoLicenseSearchEnumParam {
    /**
     * Return all videos, regardless of which license they have, that match the query parameters.
     */
    any = 'any',

    /**
     * Only return videos that have a Creative Commons license. Users can reuse
     * videos with this license in other videos that they create. Learn more.
     */
    creativeCommon = 'creativeCommon',

    /**
     * Only return videos that have the standard YouTube license.
     */
    youtube = 'youtube'
  }

  const enum VideoSyndicatedSearchEnumParam {
    /**
     * Return all videos, syndicated or not.
     */
    any = 'any',

    /**
     * Only retrieve syndicated videos.
     */
    TRUE = 'TRUE'
  }

  const enum VideoTypeSearchEnumParam {
    /**
     * Return all videos.
     */
    any = 'any',

    /**
     * Only retrieve episodes of shows.
     */
    episode = 'episode',

    /**
     * Only retrieve movies.
     */
    movie = 'movie'
  }

  interface ISearchListResponse {
    __typename: 'SearchListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of results that match the search criteria.
     */
    items: Array<ISearchResult | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#searchListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    regionCode: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A search result contains information about a YouTube video, channel, or playlist
   * that matches the search parameters specified in an API request. While a search
   * result points to a uniquely identifiable resource, like a video, it does not
   * have its own persistent data.
   */
  interface ISearchResult {
    __typename: 'SearchResult'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The id object contains information that can be used to uniquely identify the resource that matches the search request.
     */
    id: IResourceId | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#searchResult".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about a search result, such as its
     * title or description. For example, if the search result is a video, then the
     * title will be the video's title and the description will be the video's description.
     */
    snippet: ISearchResultSnippet | null
  }

  /**
   * Basic details about a search result, including title, description and thumbnails
   * of the item referenced by the search result.
   */
  interface ISearchResultSnippet {
    __typename: 'SearchResultSnippet'

    /**
     * The value that YouTube uses to uniquely identify the channel that published
     * the resource that the search result identifies.
     */
    channelId: string | null

    /**
     * The title of the channel that published the resource that the search result identifies.
     */
    channelTitle: string | null

    /**
     * A description of the search result.
     */
    description: string | null

    /**
     * It indicates if the resource (video or channel) has upcoming/active live
     * broadcast content. Or it's "none" if there is not any upcoming/active live broadcasts.
     */
    liveBroadcastContent: string | null

    /**
     * The creation date and time of the resource that the search result identifies.
     * The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAt: string | null

    /**
     * A map of thumbnail images associated with the search result. For each object
     * in the map, the key is the name of the thumbnail image, and the value is an
     * object that contains other information about the thumbnail.
     */
    thumbnails: IThumbnailDetails | null

    /**
     * The title of the search result.
     */
    title: string | null
  }

  interface ISponsors {
    __typename: 'Sponsors_'

    /**
     * Lists sponsors for a channel.
     */
    list: ISponsorListResponse | null
  }

  interface IListOnSponsorsArguments {
    /**
     * The filter parameter specifies which channel sponsors to return.
     */
    filter?: FilterSponsorsEnumParam | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies the sponsor resource parts that the API
     * response will include. Supported values are id and snippet.
     */
    part: string
  }

  const enum FilterSponsorsEnumParam {
    /**
     * Return all sponsors, from newest to oldest.
     */
    all = 'all',

    /**
     * Return the most recent sponsors, from newest to oldest.
     */
    newest = 'newest'
  }

  interface ISponsorListResponse {
    __typename: 'SponsorListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of sponsors that match the request criteria.
     */
    items: Array<ISponsor | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#sponsorListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A sponsor resource represents a sponsor for a YouTube channel. A sponsor
   * provides recurring monetary support to a creator and receives special benefits.
   */
  interface ISponsor {
    __typename: 'Sponsor'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#sponsor".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the sponsor.
     */
    snippet: ISponsorSnippet | null
  }

  interface ISponsorSnippet {
    __typename: 'SponsorSnippet'

    /**
     * The id of the channel being sponsored.
     */
    channelId: string | null

    /**
     * The cumulative time a user has been a sponsor in months.
     */
    cumulativeDurationMonths: number | null

    /**
     * Details about the sponsor.
     */
    sponsorDetails: IChannelProfileDetails | null

    /**
     * The date and time when the user became a sponsor. The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    sponsorSince: string | null
  }

  interface ISubscriptions {
    __typename: 'Subscriptions_'

    /**
     * Returns subscription resources that match the API request criteria.
     */
    list: ISubscriptionListResponse | null
  }

  interface IListOnSubscriptionsArguments {
    /**
     * The channelId parameter specifies a YouTube channel ID. The API will only return that channel's subscriptions.
     */
    channelId?: string | null

    /**
     * The forChannelId parameter specifies a comma-separated list of channel IDs.
     * The API response will then only contain subscriptions matching those channels.
     */
    forChannelId?: string | null

    /**
     * The id parameter specifies a comma-separated list of the YouTube
     * subscription ID(s) for the resource(s) that are being retrieved. In a
     * subscription resource, the id property specifies the YouTube subscription ID.
     */
    id?: string | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * Set this parameter's value to true to retrieve a feed of the authenticated user's subscriptions.
     */
    mine?: boolean | null

    /**
     * Set this parameter's value to true to retrieve a feed of the subscribers of
     * the authenticated user in reverse chronological order (newest first).
     */
    myRecentSubscribers?: boolean | null

    /**
     * Set this parameter's value to true to retrieve a feed of the subscribers of
     * the authenticated user in no particular order.
     */
    mySubscribers?: boolean | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The CMS account that
     * the user authenticates with must be linked to the specified YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null

    /**
     * This parameter can only be used in a properly authorized request. Note: This
     * parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwnerChannel parameter specifies the YouTube channel ID
     * of the channel to which a video is being added. This parameter is required
     * when a request specifies a value for the onBehalfOfContentOwner parameter,
     * and it can only be used in conjunction with that parameter. In addition, the
     * request must be authorized using a CMS account that is linked to the content
     * owner that the onBehalfOfContentOwner parameter specifies. Finally, the
     * channel that the onBehalfOfContentOwnerChannel parameter value specifies
     * must be linked to the content owner that the onBehalfOfContentOwner
     * parameter specifies.
     *
     * This parameter is intended for YouTube content partners that own and manage
     * many different YouTube channels. It allows content owners to authenticate
     * once and perform actions on behalf of the channel specified in the parameter
     * value, without having to provide authentication credentials for each
     * separate channel.
     */
    onBehalfOfContentOwnerChannel?: string | null

    /**
     * The order parameter specifies the method that will be used to sort resources in the API response.
     */
    order?: OrderSubscriptionsEnumParam | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more
     * subscription resource properties that the API response will include.
     *
     * If the parameter identifies a property that contains child properties, the
     * child properties will be included in the response. For example, in a
     * subscription resource, the snippet property contains other properties, such
     * as a display title for the subscription. If you set part=snippet, the API
     * response will also contain all of those nested properties.
     */
    part: string
  }

  const enum OrderSubscriptionsEnumParam {
    /**
     * Sort alphabetically.
     */
    alphabetical = 'alphabetical',

    /**
     * Sort by relevance.
     */
    relevance = 'relevance',

    /**
     * Sort by order of activity.
     */
    unread = 'unread'
  }

  interface ISubscriptionListResponse {
    __typename: 'SubscriptionListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of subscriptions that match the request criteria.
     */
    items: Array<ISubscription | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#subscriptionListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  interface ISubscription {
    __typename: 'Subscription'

    /**
     * The contentDetails object contains basic statistics about the subscription.
     */
    contentDetails: ISubscriptionContentDetails | null

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the subscription.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#subscription".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the subscription, including
     * its title and the channel that the user subscribed to.
     */
    snippet: ISubscriptionSnippet | null

    /**
     * The subscriberSnippet object contains basic details about the sbuscriber.
     */
    subscriberSnippet: ISubscriptionSubscriberSnippet | null
    trackUpdated: ITrack | null
  }

  interface ITrackUpdatedOnSubscriptionArguments {
    input: ITrackUpdatedInput
  }

  /**
   * Details about the content to witch a subscription refers.
   */
  interface ISubscriptionContentDetails {
    __typename: 'SubscriptionContentDetails'

    /**
     * The type of activity this subscription is for (only uploads, everything).
     */
    activityType: string | null

    /**
     * The number of new items in the subscription since its content was last read.
     */
    newItemCount: number | null

    /**
     * The approximate number of items that the subscription points to.
     */
    totalItemCount: number | null
  }

  /**
   * Basic details about a subscription, including title, description and thumbnails of the subscribed item.
   */
  interface ISubscriptionSnippet {
    __typename: 'SubscriptionSnippet'

    /**
     * The ID that YouTube uses to uniquely identify the subscriber's channel.
     */
    channelId: string | null

    /**
     * Channel title for the channel that the subscription belongs to.
     */
    channelTitle: string | null

    /**
     * The subscription's details.
     */
    description: string | null

    /**
     * The date and time that the subscription was created. The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAt: string | null

    /**
     * The id object contains information about the channel that the user subscribed to.
     */
    resourceId: IResourceId | null

    /**
     * A map of thumbnail images associated with the video. For each object in the
     * map, the key is the name of the thumbnail image, and the value is an object
     * that contains other information about the thumbnail.
     */
    thumbnails: IThumbnailDetails | null

    /**
     * The subscription's title.
     */
    title: string | null
  }

  /**
   * Basic details about a subscription's subscriber including title, description, channel ID and thumbnails.
   */
  interface ISubscriptionSubscriberSnippet {
    __typename: 'SubscriptionSubscriberSnippet'

    /**
     * The channel ID of the subscriber.
     */
    channelId: string | null

    /**
     * The description of the subscriber.
     */
    description: string | null

    /**
     * Thumbnails for this subscriber.
     */
    thumbnails: IThumbnailDetails | null

    /**
     * The title of the subscriber.
     */
    title: string | null
  }

  interface ITrackUpdatedInput {
    channel?: string | null
  }

  interface ISuperChatEvents {
    __typename: 'SuperChatEvents_'

    /**
     * Lists Super Chat events for a channel.
     */
    list: ISuperChatEventListResponse | null
  }

  interface IListOnSuperChatEventsArguments {
    /**
     * The hl parameter instructs the API to retrieve localized resource metadata
     * for a specific application language that the YouTube website supports. The
     * parameter value must be a language code included in the list returned by the
     * i18nLanguages.list method.
     *
     * If localized resource details are available in that language, the resource's
     * snippet.localized object will contain the localized values. However, if
     * localized details are not available, the snippet.localized object will
     * contain resource details in the resource's default language.
     */
    hl?: string | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     */
    maxResults?: number | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies the superChatEvent resource parts that the API
     * response will include. Supported values are id and snippet.
     */
    part: string
  }

  interface ISuperChatEventListResponse {
    __typename: 'SuperChatEventListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of Super Chat purchases that match the request criteria.
     */
    items: Array<ISuperChatEvent | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#superChatEventListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A superChatEvent resource represents a Super Chat purchase on a YouTube channel.
   */
  interface ISuperChatEvent {
    __typename: 'SuperChatEvent'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube assigns to uniquely identify the Super Chat event.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#superChatEvent".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the Super Chat event.
     */
    snippet: ISuperChatEventSnippet | null
  }

  interface ISuperChatEventSnippet {
    __typename: 'SuperChatEventSnippet'

    /**
     * The purchase amount, in micros of the purchase currency. e.g., 1 is represented as 1000000.
     */
    amountMicros: string | null

    /**
     * Channel id where the event occurred.
     */
    channelId: string | null

    /**
     * The text contents of the comment left by the user.
     */
    commentText: string | null

    /**
     * The date and time when the event occurred. The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    createdAt: string | null

    /**
     * The currency in which the purchase was made. ISO 4217.
     */
    currency: string | null

    /**
     * A rendered string that displays the purchase amount and currency (e.g.,
     * "$1.00"). The string is rendered for the given language.
     */
    displayString: string | null

    /**
     * True if this event is a Super Chat for Good purchase.
     */
    isSuperChatForGood: boolean | null

    /**
     * The tier for the paid message, which is based on the amount of money spent to purchase the message.
     */
    messageType: number | null

    /**
     * If this event is a Super Chat for Good purchase, this field will contain
     * information about the charity the purchase is donated to.
     */
    nonprofit: INonprofit | null

    /**
     * Details about the supporter.
     */
    supporterDetails: IChannelProfileDetails | null
  }

  /**
   * Nonprofit information.
   */
  interface INonprofit {
    __typename: 'Nonprofit'

    /**
     * Id of the nonprofit.
     */
    nonprofitId: INonprofitId | null

    /**
     * Legal name of the nonprofit.
     */
    nonprofitLegalName: string | null
  }

  interface INonprofitId {
    __typename: 'NonprofitId'
    value: string | null
  }

  interface IVideoAbuseReportReasons {
    __typename: 'VideoAbuseReportReasons_'

    /**
     * Returns a list of abuse reasons that can be used for reporting abusive videos.
     */
    list: IVideoAbuseReportReasonListResponse | null
  }

  interface IListOnVideoAbuseReportReasonsArguments {
    /**
     * The hl parameter specifies the language that should be used for text values in the API response.
     */
    hl?: string | null

    /**
     * The part parameter specifies the videoCategory resource parts that the API
     * response will include. Supported values are id and snippet.
     */
    part: string
  }

  interface IVideoAbuseReportReasonListResponse {
    __typename: 'VideoAbuseReportReasonListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of valid abuse reasons that are used with video.ReportAbuse.
     */
    items: Array<IVideoAbuseReportReason | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#videoAbuseReportReasonListResponse".
     */
    kind: string | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A videoAbuseReportReason resource identifies a reason that a video could be
   * reported as abusive. Video abuse report reasons are used with video.ReportAbuse.
   */
  interface IVideoAbuseReportReason {
    __typename: 'VideoAbuseReportReason'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID of this abuse report reason.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#videoAbuseReportReason".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the abuse report reason.
     */
    snippet: IVideoAbuseReportReasonSnippet | null
  }

  /**
   * Basic details about a video category, such as its localized title.
   */
  interface IVideoAbuseReportReasonSnippet {
    __typename: 'VideoAbuseReportReasonSnippet'

    /**
     * The localized label belonging to this abuse report reason.
     */
    label: string | null

    /**
     * The secondary reasons associated with this reason, if any are available. (There might be 0 or more.)
     */
    secondaryReasons: Array<IVideoAbuseReportSecondaryReason | null> | null
  }

  interface IVideoAbuseReportSecondaryReason {
    __typename: 'VideoAbuseReportSecondaryReason'

    /**
     * The ID of this abuse report secondary reason.
     */
    id: string | null

    /**
     * The localized label for this abuse report secondary reason.
     */
    label: string | null
  }

  interface IVideoCategories {
    __typename: 'VideoCategories_'

    /**
     * Returns a list of categories that can be associated with YouTube videos.
     */
    list: IVideoCategoryListResponse | null
  }

  interface IListOnVideoCategoriesArguments {
    /**
     * The hl parameter specifies the language that should be used for text values in the API response.
     */
    hl?: string | null

    /**
     * The id parameter specifies a comma-separated list of video category IDs for the resources that you are retrieving.
     */
    id?: string | null

    /**
     * The part parameter specifies the videoCategory resource properties that the
     * API response will include. Set the parameter value to snippet.
     */
    part: string

    /**
     * The regionCode parameter instructs the API to return the list of video
     * categories available in the specified country. The parameter value is an ISO
     * 3166-1 alpha-2 country code.
     */
    regionCode?: string | null
  }

  interface IVideoCategoryListResponse {
    __typename: 'VideoCategoryListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of video categories that can be associated with YouTube videos. In this
     * map, the video category ID is the map key, and its value is the corresponding
     * videoCategory resource.
     */
    items: Array<IVideoCategory | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#videoCategoryListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A videoCategory resource identifies a category that has been or could be associated with uploaded videos.
   */
  interface IVideoCategory {
    __typename: 'VideoCategory'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The ID that YouTube uses to uniquely identify the video category.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#videoCategory".
     */
    kind: string | null

    /**
     * The snippet object contains basic details about the video category, including its title.
     */
    snippet: IVideoCategorySnippet | null
  }

  /**
   * Basic details about a video category, such as its localized title.
   */
  interface IVideoCategorySnippet {
    __typename: 'VideoCategorySnippet'
    assignable: boolean | null

    /**
     * The YouTube channel that created the video category.
     */
    channelId: string | null

    /**
     * The video category's title.
     */
    title: string | null
  }

  interface IVideos {
    __typename: 'Videos_'

    /**
     * Retrieves the ratings that the authorized user gave to a list of specified videos.
     */
    getRating: IVideoGetRatingResponse | null

    /**
     * Returns a list of videos that match the API request parameters.
     */
    list: IVideoListResponse | null
  }

  interface IGetRatingOnVideosArguments {
    /**
     * The id parameter specifies a comma-separated list of the YouTube video ID(s)
     * for the resource(s) for which you are retrieving rating data. In a video
     * resource, the id property specifies the video's ID.
     */
    id: string

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The CMS account that
     * the user authenticates with must be linked to the specified YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null
  }

  interface IListOnVideosArguments {
    /**
     * The chart parameter identifies the chart that you want to retrieve.
     */
    chart?: ChartVideosEnumParam | null

    /**
     * The hl parameter instructs the API to retrieve localized resource metadata
     * for a specific application language that the YouTube website supports. The
     * parameter value must be a language code included in the list returned by the
     * i18nLanguages.list method.
     *
     * If localized resource details are available in that language, the resource's
     * snippet.localized object will contain the localized values. However, if
     * localized details are not available, the snippet.localized object will
     * contain resource details in the resource's default language.
     */
    hl?: string | null

    /**
     * The id parameter specifies a comma-separated list of the YouTube video ID(s)
     * for the resource(s) that are being retrieved. In a video resource, the id
     * property specifies the video's ID.
     */
    id?: string | null

    /**
     * DEPRECATED
     */
    locale?: string | null

    /**
     * The maxHeight parameter specifies a maximum height of the embedded player.
     * If maxWidth is provided, maxHeight may not be reached in order to not
     * violate the width request.
     */
    maxHeight?: number | null

    /**
     * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
     *
     * Note: This parameter is supported for use in conjunction with the myRating
     * and chart parameters, but it is not supported for use in conjunction with
     * the id parameter.
     */
    maxResults?: number | null

    /**
     * The maxWidth parameter specifies a maximum width of the embedded player. If
     * maxHeight is provided, maxWidth may not be reached in order to not violate
     * the height request.
     */
    maxWidth?: number | null

    /**
     * Set this parameter's value to like or dislike to instruct the API to only
     * return videos liked or disliked by the authenticated user.
     */
    myRating?: MyRatingVideosEnumParam | null

    /**
     * Note: This parameter is intended exclusively for YouTube content partners.
     *
     * The onBehalfOfContentOwner parameter indicates that the request's
     * authorization credentials identify a YouTube CMS user who is acting on
     * behalf of the content owner specified in the parameter value. This parameter
     * is intended for YouTube content partners that own and manage many different
     * YouTube channels. It allows content owners to authenticate once and get
     * access to all their video and channel data, without having to provide
     * authentication credentials for each individual channel. The CMS account that
     * the user authenticates with must be linked to the specified YouTube content owner.
     */
    onBehalfOfContentOwner?: string | null

    /**
     * The pageToken parameter identifies a specific page in the result set that
     * should be returned. In an API response, the nextPageToken and prevPageToken
     * properties identify other pages that could be retrieved.
     *
     * Note: This parameter is supported for use in conjunction with the myRating
     * and chart parameters, but it is not supported for use in conjunction with
     * the id parameter.
     */
    pageToken?: string | null

    /**
     * The part parameter specifies a comma-separated list of one or more video
     * resource properties that the API response will include.
     *
     * If the parameter identifies a property that contains child properties, the
     * child properties will be included in the response. For example, in a video
     * resource, the snippet property contains the channelId, title, description,
     * tags, and categoryId properties. As such, if you set part=snippet, the API
     * response will contain all of those properties.
     */
    part: string

    /**
     * The regionCode parameter instructs the API to select a video chart available
     * in the specified region. This parameter can only be used in conjunction with
     * the chart parameter. The parameter value is an ISO 3166-1 alpha-2 country code.
     */
    regionCode?: string | null

    /**
     * The videoCategoryId parameter identifies the video category for which the
     * chart should be retrieved. This parameter can only be used in conjunction
     * with the chart parameter. By default, charts are not restricted to a
     * particular category.
     */
    videoCategoryId?: string | null
  }

  interface IVideoGetRatingResponse {
    __typename: 'VideoGetRatingResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of ratings that match the request criteria.
     */
    items: Array<IVideoRating | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#videoGetRatingResponse".
     */
    kind: string | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  interface IVideoRating {
    __typename: 'VideoRating'
    rating: string | null
    videoId: string | null
  }

  const enum ChartVideosEnumParam {
    /**
     * Return the most popular videos for the specified content region and video category.
     */
    mostPopular = 'mostPopular'
  }

  const enum MyRatingVideosEnumParam {
    /**
     * Returns only videos disliked by the authenticated user.
     */
    dislike = 'dislike',

    /**
     * Returns only video liked by the authenticated user.
     */
    like = 'like'
  }

  interface IVideoListResponse {
    __typename: 'VideoListResponse'

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * Serialized EventId of the request which produced this response.
     */
    eventId: string | null

    /**
     * A list of videos that match the request criteria.
     */
    items: Array<IVideo | null> | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#videoListResponse".
     */
    kind: string | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set.
     */
    nextPageToken: string | null
    pageInfo: IPageInfo | null

    /**
     * The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set.
     */
    prevPageToken: string | null
    tokenPagination: ITokenPagination | null

    /**
     * The visitorId identifies the visitor.
     */
    visitorId: string | null
  }

  /**
   * A video resource represents a YouTube video.
   */
  interface IVideo {
    __typename: 'Video'

    /**
     * Age restriction details related to a video. This data can only be retrieved by the video owner.
     */
    ageGating: IVideoAgeGating | null

    /**
     * The contentDetails object contains information about the video content,
     * including the length of the video and its aspect ratio.
     */
    contentDetails: IVideoContentDetails | null

    /**
     * Etag of this resource.
     */
    etag: string | null

    /**
     * The fileDetails object encapsulates information about the video file that was
     * uploaded to YouTube, including the file's resolution, duration, audio and
     * video codecs, stream bitrates, and more. This data can only be retrieved by
     * the video owner.
     */
    fileDetails: IVideoFileDetails | null

    /**
     * The ID that YouTube uses to uniquely identify the video.
     */
    id: string | null

    /**
     * Identifies what kind of resource this is. Value: the fixed string "youtube#video".
     */
    kind: string | null

    /**
     * The liveStreamingDetails object contains metadata about a live video
     * broadcast. The object will only be present in a video resource if the video is
     * an upcoming, live, or completed live broadcast.
     */
    liveStreamingDetails: IVideoLiveStreamingDetails | null

    /**
     * The monetizationDetails object encapsulates information about the monetization status of the video.
     */
    monetizationDetails: IVideoMonetizationDetails | null

    /**
     * The player object contains information that you would use to play the video in an embedded player.
     */
    player: IVideoPlayer | null

    /**
     * The processingDetails object encapsulates information about YouTube's progress
     * in processing the uploaded video file. The properties in the object identify
     * the current processing status and an estimate of the time remaining until
     * YouTube finishes processing the video. This part also indicates whether
     * different types of data or content, such as file details or thumbnail images,
     * are available for the video.
     *
     * The processingProgress object is designed to be polled so that the video
     * uploaded can track the progress that YouTube has made in processing the
     * uploaded video file. This data can only be retrieved by the video owner.
     */
    processingDetails: IVideoProcessingDetails | null

    /**
     * The projectDetails object contains information about the project specific video metadata.
     */
    projectDetails: IVideoProjectDetails | null

    /**
     * The recordingDetails object encapsulates information about the location, date and address where the video was recorded.
     */
    recordingDetails: IVideoRecordingDetails | null

    /**
     * The snippet object contains basic details about the video, such as its title, description, and category.
     */
    snippet: IVideoSnippet | null

    /**
     * The statistics object contains statistics about the video.
     */
    statistics: IVideoStatistics | null

    /**
     * The status object contains information about the video's uploading, processing, and privacy statuses.
     */
    status: IVideoStatus | null

    /**
     * The suggestions object encapsulates suggestions that identify opportunities to
     * improve the video quality or the metadata for the uploaded video. This data
     * can only be retrieved by the video owner.
     */
    suggestions: IVideoSuggestions | null

    /**
     * The topicDetails object encapsulates information about Freebase topics associated with the video.
     */
    topicDetails: IVideoTopicDetails | null
  }

  interface IVideoAgeGating {
    __typename: 'VideoAgeGating'

    /**
     * Indicates whether or not the video has alcoholic beverage content. Only users
     * of legal purchasing age in a particular country, as identified by ICAP, can
     * view the content.
     */
    alcoholContent: boolean | null

    /**
     * Age-restricted trailers. For redband trailers and adult-rated video-games.
     * Only users aged 18+ can view the content. The the field is true the content is
     * restricted to viewers aged 18+. Otherwise The field won't be present.
     */
    restricted: boolean | null

    /**
     * Video game rating, if any.
     */
    videoGameRating: string | null
  }

  /**
   * Details about the content of a YouTube Video.
   */
  interface IVideoContentDetails {
    __typename: 'VideoContentDetails'

    /**
     * The value of captions indicates whether the video has captions or not.
     */
    caption: string | null

    /**
     * Specifies the ratings that the video received under various rating schemes.
     */
    contentRating: IContentRating | null

    /**
     * The countryRestriction object contains information about the countries where a video is (or is not) viewable.
     */
    countryRestriction: IAccessPolicy | null

    /**
     * The value of definition indicates whether the video is available in high definition or only in standard definition.
     */
    definition: string | null

    /**
     * The value of dimension indicates whether the video is available in 3D or in 2D.
     */
    dimension: string | null

    /**
     * The length of the video. The tag value is an ISO 8601 duration in the format
     * PT#M#S, in which the letters PT indicate that the value specifies a period of
     * time, and the letters M and S refer to length in minutes and seconds,
     * respectively. The # characters preceding the M and S letters are both integers
     * that specify the number of minutes (or seconds) of the video. For example, a
     * value of PT15M51S indicates that the video is 15 minutes and 51 seconds long.
     */
    duration: string | null

    /**
     * Indicates whether the video uploader has provided a custom thumbnail image for
     * the video. This property is only visible to the video uploader.
     */
    hasCustomThumbnail: boolean | null

    /**
     * The value of is_license_content indicates whether the video is licensed content.
     */
    licensedContent: boolean | null

    /**
     * Specifies the projection format of the video.
     */
    projection: string | null

    /**
     * The regionRestriction object contains information about the countries where a
     * video is (or is not) viewable. The object will contain either the
     * contentDetails.regionRestriction.allowed property or the
     * contentDetails.regionRestriction.blocked property.
     */
    regionRestriction: IVideoContentDetailsRegionRestriction | null
  }

  /**
   * Ratings schemes. The country-specific ratings are mostly for movies and shows. NEXT_ID: 71
   */
  interface IContentRating {
    __typename: 'ContentRating'

    /**
     * The video's Australian Classification Board (ACB) or Australian Communications
     * and Media Authority (ACMA) rating. ACMA ratings are used to classify
     * children's television programming.
     */
    acbRating: string | null

    /**
     * The video's rating from Italy's Autorità per le Garanzie nelle Comunicazioni (AGCOM).
     */
    agcomRating: string | null

    /**
     * The video's Anatel (Asociación Nacional de Televisión) rating for Chilean television.
     */
    anatelRating: string | null

    /**
     * The video's British Board of Film Classification (BBFC) rating.
     */
    bbfcRating: string | null

    /**
     * The video's rating from Thailand's Board of Film and Video Censors.
     */
    bfvcRating: string | null

    /**
     * The video's rating from the Austrian Board of Media Classification (Bundesministerium für Unterricht, Kunst und Kultur).
     */
    bmukkRating: string | null

    /**
     * Rating system for Canadian TV - Canadian TV Classification System The video's
     * rating from the Canadian Radio-Television and Telecommunications Commission
     * (CRTC) for Canadian English-language broadcasts. For more information, see the
     * Canadian Broadcast Standards Council website.
     */
    catvRating: string | null

    /**
     * The video's rating from the Canadian Radio-Television and Telecommunications
     * Commission (CRTC) for Canadian French-language broadcasts. For more
     * information, see the Canadian Broadcast Standards Council website.
     */
    catvfrRating: string | null

    /**
     * The video's Central Board of Film Certification (CBFC - India) rating.
     */
    cbfcRating: string | null

    /**
     * The video's Consejo de Calificación Cinematográfica (Chile) rating.
     */
    cccRating: string | null

    /**
     * The video's rating from Portugal's Comissão de Classificação de Espect´culos.
     */
    cceRating: string | null

    /**
     * The video's rating in Switzerland.
     */
    chfilmRating: string | null

    /**
     * The video's Canadian Home Video Rating System (CHVRS) rating.
     */
    chvrsRating: string | null

    /**
     * The video's rating from the Commission de Contrôle des Films (Belgium).
     */
    cicfRating: string | null

    /**
     * The video's rating from Romania's CONSILIUL NATIONAL AL AUDIOVIZUALULUI (CNA).
     */
    cnaRating: string | null

    /**
     * Rating system in France - Commission de classification cinematographique
     */
    cncRating: string | null

    /**
     * The video's rating from France's Conseil supérieur de l?audiovisuel, which rates broadcast content.
     */
    csaRating: string | null

    /**
     * The video's rating from Luxembourg's Commission de surveillance de la classification des films (CSCF).
     */
    cscfRating: string | null

    /**
     * The video's rating in the Czech Republic.
     */
    czfilmRating: string | null

    /**
     * The video's Departamento de Justiça, Classificação, Qualificação e Títulos (DJCQT - Brazil) rating.
     */
    djctqRating: string | null

    /**
     * Reasons that explain why the video received its DJCQT (Brazil) rating.
     */
    djctqRatingReasons: DjctqRatingReasons | null

    /**
     * Rating system in Turkey - Evaluation and Classification Board of the Ministry of Culture and Tourism
     */
    ecbmctRating: string | null

    /**
     * The video's rating in Estonia.
     */
    eefilmRating: string | null

    /**
     * The video's rating in Egypt.
     */
    egfilmRating: string | null

    /**
     * The video's Eirin (映倫) rating. Eirin is the Japanese rating system.
     */
    eirinRating: string | null

    /**
     * The video's rating from Malaysia's Film Censorship Board.
     */
    fcbmRating: string | null

    /**
     * The video's rating from Hong Kong's Office for Film, Newspaper and Article Administration.
     */
    fcoRating: string | null

    /**
     * This property has been deprecated. Use the contentDetails.contentRating.cncRating instead.
     */
    fmocRating: string | null

    /**
     * The video's rating from South Africa's Film and Publication Board.
     */
    fpbRating: string | null

    /**
     * Reasons that explain why the video received its FPB (South Africa) rating.
     */
    fpbRatingReasons: FpbRatingReasons | null

    /**
     * The video's Freiwillige Selbstkontrolle der Filmwirtschaft (FSK - Germany) rating.
     */
    fskRating: string | null

    /**
     * The video's rating in Greece.
     */
    grfilmRating: string | null

    /**
     * The video's Instituto de la Cinematografía y de las Artes Audiovisuales (ICAA - Spain) rating.
     */
    icaaRating: string | null

    /**
     * The video's Irish Film Classification Office (IFCO - Ireland) rating. See the IFCO website for more information.
     */
    ifcoRating: string | null

    /**
     * The video's rating in Israel.
     */
    ilfilmRating: string | null

    /**
     * The video's INCAA (Instituto Nacional de Cine y Artes Audiovisuales - Argentina) rating.
     */
    incaaRating: string | null

    /**
     * The video's rating from the Kenya Film Classification Board.
     */
    kfcbRating: string | null

    /**
     * voor de Classificatie van Audiovisuele Media (Netherlands).
     */
    kijkwijzerRating: string | null

    /**
     * The video's Korea Media Rating Board (영상물등급위원회) rating. The KMRB rates videos in South Korea.
     */
    kmrbRating: string | null

    /**
     * The video's rating from Indonesia's Lembaga Sensor Film.
     */
    lsfRating: string | null

    /**
     * The video's rating from Malta's Film Age-Classification Board.
     */
    mccaaRating: string | null

    /**
     * The video's rating from the Danish Film Institute's (Det Danske Filminstitut) Media Council for Children and Young People.
     */
    mccypRating: string | null

    /**
     * The video's rating system for Vietnam - MCST
     */
    mcstRating: string | null

    /**
     * The video's rating from Singapore's Media Development Authority (MDA) and, specifically, it's Board of Film Censors (BFC).
     */
    mdaRating: string | null

    /**
     * The video's rating from Medietilsynet, the Norwegian Media Authority.
     */
    medietilsynetRating: string | null

    /**
     * The video's rating from Finland's Kansallinen Audiovisuaalinen Instituutti (National Audiovisual Institute).
     */
    mekuRating: string | null

    /**
     * The rating system for MENA countries, a clone of MPAA. It is needed to
     */
    menaMpaaRating: string | null

    /**
     * The video's rating from the Ministero dei Beni e delle Attività Culturali e del Turismo (Italy).
     */
    mibacRating: string | null

    /**
     * The video's Ministerio de Cultura (Colombia) rating.
     */
    mocRating: string | null

    /**
     * The video's rating from Taiwan's Ministry of Culture (文化部).
     */
    moctwRating: string | null

    /**
     * The video's Motion Picture Association of America (MPAA) rating.
     */
    mpaaRating: string | null

    /**
     * The rating system for trailer, DVD, and Ad in the US. See http://movielabs.com/md/ratings/v2.3/html/US_MPAAT_Ratings.html.
     */
    mpaatRating: string | null

    /**
     * The video's rating from the Movie and Television Review and Classification Board (Philippines).
     */
    mtrcbRating: string | null

    /**
     * The video's rating from the Maldives National Bureau of Classification.
     */
    nbcRating: string | null

    /**
     * The video's rating in Poland.
     */
    nbcplRating: string | null

    /**
     * The video's rating from the Bulgarian National Film Center.
     */
    nfrcRating: string | null

    /**
     * The video's rating from Nigeria's National Film and Video Censors Board.
     */
    nfvcbRating: string | null

    /**
     * The video's rating from the Nacionãlais Kino centrs (National Film Centre of Latvia).
     */
    nkclvRating: string | null

    /**
     * The video's Office of Film and Literature Classification (OFLC - New Zealand) rating.
     */
    oflcRating: string | null

    /**
     * The video's rating in Peru.
     */
    pefilmRating: string | null

    /**
     * The video's rating from the Hungarian Nemzeti Filmiroda, the Rating Committee of the National Office of Film.
     */
    rcnofRating: string | null

    /**
     * The video's rating in Venezuela.
     */
    resorteviolenciaRating: string | null

    /**
     * The video's General Directorate of Radio, Television and Cinematography (Mexico) rating.
     */
    rtcRating: string | null

    /**
     * The video's rating from Ireland's Raidió Teilifís Éireann.
     */
    rteRating: string | null

    /**
     * The video's National Film Registry of the Russian Federation (MKRF - Russia) rating.
     */
    russiaRating: string | null

    /**
     * The video's rating in Slovakia.
     */
    skfilmRating: string | null

    /**
     * The video's rating in Iceland.
     */
    smaisRating: string | null

    /**
     * The video's rating from Statens medieråd (Sweden's National Media Council).
     */
    smsaRating: string | null

    /**
     * The video's TV Parental Guidelines (TVPG) rating.
     */
    tvpgRating: string | null

    /**
     * A rating that YouTube uses to identify age-restricted content.
     */
    ytRating: string | null
  }

  const enum DjctqRatingReasons {
    djctqCriminalActs = 'djctqCriminalActs',
    djctqDrugs = 'djctqDrugs',
    djctqExplicitSex = 'djctqExplicitSex',
    djctqExtremeViolence = 'djctqExtremeViolence',
    djctqIllegalDrugs = 'djctqIllegalDrugs',
    djctqImpactingContent = 'djctqImpactingContent',
    djctqInappropriateLanguage = 'djctqInappropriateLanguage',
    djctqLegalDrugs = 'djctqLegalDrugs',
    djctqNudity = 'djctqNudity',
    djctqSex = 'djctqSex',
    djctqSexualContent = 'djctqSexualContent',
    djctqViolence = 'djctqViolence'
  }

  const enum FpbRatingReasons {
    fpbBlasphemy = 'fpbBlasphemy',
    fpbCriminalTechniques = 'fpbCriminalTechniques',
    fpbDrugs = 'fpbDrugs',
    fpbHorror = 'fpbHorror',
    fpbImitativeActsTechniques = 'fpbImitativeActsTechniques',
    fpbLanguage = 'fpbLanguage',
    fpbNudity = 'fpbNudity',
    fpbPrejudice = 'fpbPrejudice',
    fpbSex = 'fpbSex',
    fpbSexualViolence = 'fpbSexualViolence',
    fpbViolence = 'fpbViolence'
  }

  /**
   * Rights management policy for YouTube resources.
   */
  interface IAccessPolicy {
    __typename: 'AccessPolicy'

    /**
     * The value of allowed indicates whether the access to the policy is allowed or denied by default.
     */
    allowed: boolean | null

    /**
     * A list of region codes that identify countries where the default policy do not apply.
     */
    exception: Array<string | null> | null
  }

  /**
   * DEPRECATED Region restriction of the video.
   */
  interface IVideoContentDetailsRegionRestriction {
    __typename: 'VideoContentDetailsRegionRestriction'

    /**
     * A list of region codes that identify countries where the video is viewable. If
     * this property is present and a country is not listed in its value, then the
     * video is blocked from appearing in that country. If this property is present
     * and contains an empty list, the video is blocked in all countries.
     */
    allowed: Array<string | null> | null

    /**
     * A list of region codes that identify countries where the video is blocked. If
     * this property is present and a country is not listed in its value, then the
     * video is viewable in that country. If this property is present and contains an
     * empty list, the video is viewable in all countries.
     */
    blocked: Array<string | null> | null
  }

  /**
   * Describes original video file properties, including technical details about
   * audio and video streams, but also metadata information like content length,
   * digitization time, or geotagging information.
   */
  interface IVideoFileDetails {
    __typename: 'VideoFileDetails'

    /**
     * A list of audio streams contained in the uploaded video file. Each item in the
     * list contains detailed metadata about an audio stream.
     */
    audioStreams: Array<IVideoFileDetailsAudioStream | null> | null

    /**
     * The uploaded video file's combined (video and audio) bitrate in bits per second.
     */
    bitrateBps: string | null

    /**
     * The uploaded video file's container format.
     */
    container: string | null

    /**
     * The date and time when the uploaded video file was created. The value is
     * specified in ISO 8601 format. Currently, the following ISO 8601 formats are supported:
     * - Date only: YYYY-MM-DD
     * - Naive time: YYYY-MM-DDTHH:MM:SS
     * - Time with timezone: YYYY-MM-DDTHH:MM:SS+HH:MM
     */
    creationTime: string | null

    /**
     * The length of the uploaded video in milliseconds.
     */
    durationMs: string | null

    /**
     * The uploaded file's name. This field is present whether a video file or another type of file was uploaded.
     */
    fileName: string | null

    /**
     * The uploaded file's size in bytes. This field is present whether a video file or another type of file was uploaded.
     */
    fileSize: string | null

    /**
     * The uploaded file's type as detected by YouTube's video processing engine.
     * Currently, YouTube only processes video files, but this field is present
     * whether a video file or another type of file was uploaded.
     */
    fileType: string | null

    /**
     * A list of video streams contained in the uploaded video file. Each item in the
     * list contains detailed metadata about a video stream.
     */
    videoStreams: Array<IVideoFileDetailsVideoStream | null> | null
  }

  /**
   * Information about an audio stream.
   */
  interface IVideoFileDetailsAudioStream {
    __typename: 'VideoFileDetailsAudioStream'

    /**
     * The audio stream's bitrate, in bits per second.
     */
    bitrateBps: string | null

    /**
     * The number of audio channels that the stream contains.
     */
    channelCount: number | null

    /**
     * The audio codec that the stream uses.
     */
    codec: string | null

    /**
     * A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code.
     */
    vendor: string | null
  }

  /**
   * Information about a video stream.
   */
  interface IVideoFileDetailsVideoStream {
    __typename: 'VideoFileDetailsVideoStream'

    /**
     * The video content's display aspect ratio, which specifies the aspect ratio in which the video should be displayed.
     */
    aspectRatio: number | null

    /**
     * The video stream's bitrate, in bits per second.
     */
    bitrateBps: string | null

    /**
     * The video codec that the stream uses.
     */
    codec: string | null

    /**
     * The video stream's frame rate, in frames per second.
     */
    frameRateFps: number | null

    /**
     * The encoded video content's height in pixels.
     */
    heightPixels: number | null

    /**
     * The amount that YouTube needs to rotate the original source content to properly display the video.
     */
    rotation: string | null

    /**
     * A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code.
     */
    vendor: string | null

    /**
     * The encoded video content's width in pixels. You can calculate the video's
     * encoding aspect ratio as width_pixels / height_pixels.
     */
    widthPixels: number | null
  }

  /**
   * Details about the live streaming metadata.
   */
  interface IVideoLiveStreamingDetails {
    __typename: 'VideoLiveStreamingDetails'

    /**
     * The ID of the currently active live chat attached to this video. This field is
     * filled only if the video is a currently live broadcast that has live chat.
     * Once the broadcast transitions to complete this field will be removed and the
     * live chat closed down. For persistent broadcasts that live chat id will no
     * longer be tied to this video but rather to the new video being displayed at
     * the persistent page.
     */
    activeLiveChatId: string | null

    /**
     * The time that the broadcast actually ended. The value is specified in ISO 8601
     * (YYYY-MM-DDThh:mm:ss.sZ) format. This value will not be available until the
     * broadcast is over.
     */
    actualEndTime: string | null

    /**
     * The time that the broadcast actually started. The value is specified in ISO
     * 8601 (YYYY-MM-DDThh:mm:ss.sZ) format. This value will not be available until
     * the broadcast begins.
     */
    actualStartTime: string | null

    /**
     * The number of viewers currently watching the broadcast. The property and its
     * value will be present if the broadcast has current viewers and the broadcast
     * owner has not hidden the viewcount for the video. Note that YouTube stops
     * tracking the number of concurrent viewers for a broadcast when the broadcast
     * ends. So, this property would not identify the number of viewers watching an
     * archived video of a live broadcast that already ended.
     */
    concurrentViewers: string | null

    /**
     * The time that the broadcast is scheduled to end. The value is specified in ISO
     * 8601 (YYYY-MM-DDThh:mm:ss.sZ) format. If the value is empty or the property is
     * not present, then the broadcast is scheduled to continue indefinitely.
     */
    scheduledEndTime: string | null

    /**
     * The time that the broadcast is scheduled to begin. The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    scheduledStartTime: string | null
  }

  /**
   * Details about monetization of a YouTube Video.
   */
  interface IVideoMonetizationDetails {
    __typename: 'VideoMonetizationDetails'

    /**
     * The value of access indicates whether the video can be monetized or not.
     */
    access: IAccessPolicy | null
  }

  /**
   * Player to be used for a video playback.
   */
  interface IVideoPlayer {
    __typename: 'VideoPlayer'
    embedHeight: string | null

    /**
     * An <iframe> tag that embeds a player that will play the video.
     */
    embedHtml: string | null

    /**
     * The embed width
     */
    embedWidth: string | null
  }

  /**
   * Describes processing status and progress and availability of some other Video resource parts.
   */
  interface IVideoProcessingDetails {
    __typename: 'VideoProcessingDetails'

    /**
     * This value indicates whether video editing suggestions, which might improve
     * video quality or the playback experience, are available for the video. You can
     * retrieve these suggestions by requesting the suggestions part in your
     * videos.list() request.
     */
    editorSuggestionsAvailability: string | null

    /**
     * This value indicates whether file details are available for the uploaded
     * video. You can retrieve a video's file details by requesting the fileDetails
     * part in your videos.list() request.
     */
    fileDetailsAvailability: string | null

    /**
     * The reason that YouTube failed to process the video. This property will only
     * have a value if the processingStatus property's value is failed.
     */
    processingFailureReason: string | null

    /**
     * This value indicates whether the video processing engine has generated
     * suggestions that might improve YouTube's ability to process the the video,
     * warnings that explain video processing problems, or errors that cause video
     * processing problems. You can retrieve these suggestions by requesting the
     * suggestions part in your videos.list() request.
     */
    processingIssuesAvailability: string | null

    /**
     * The processingProgress object contains information about the progress YouTube
     * has made in processing the video. The values are really only relevant if the
     * video's processing status is processing.
     */
    processingProgress: IVideoProcessingDetailsProcessingProgress | null

    /**
     * The video's processing status. This value indicates whether YouTube was able
     * to process the video or if the video is still being processed.
     */
    processingStatus: string | null

    /**
     * This value indicates whether keyword (tag) suggestions are available for the
     * video. Tags can be added to a video's metadata to make it easier for other
     * users to find the video. You can retrieve these suggestions by requesting the
     * suggestions part in your videos.list() request.
     */
    tagSuggestionsAvailability: string | null

    /**
     * This value indicates whether thumbnail images have been generated for the video.
     */
    thumbnailsAvailability: string | null
  }

  /**
   * Video processing progress and completion time estimate.
   */
  interface IVideoProcessingDetailsProcessingProgress {
    __typename: 'VideoProcessingDetailsProcessingProgress'

    /**
     * The number of parts of the video that YouTube has already processed. You can
     * estimate the percentage of the video that YouTube has already processed by calculating:
     * 100 * parts_processed / parts_total
     *
     * Note that since the estimated number of parts could increase without a
     * corresponding increase in the number of parts that have already been
     * processed, it is possible that the calculated progress could periodically
     * decrease while YouTube processes a video.
     */
    partsProcessed: string | null

    /**
     * An estimate of the total number of parts that need to be processed for the
     * video. The number may be updated with more precise estimates while YouTube
     * processes the video.
     */
    partsTotal: string | null

    /**
     * An estimate of the amount of time, in millseconds, that YouTube needs to finish processing the video.
     */
    timeLeftMs: string | null
  }

  /**
   * Project specific details about the content of a YouTube Video.
   */
  interface IVideoProjectDetails {
    __typename: 'VideoProjectDetails'

    /**
     * A list of project tags associated with the video during the upload.
     */
    tags: Array<string | null> | null
  }

  /**
   * Recording information associated with the video.
   */
  interface IVideoRecordingDetails {
    __typename: 'VideoRecordingDetails'

    /**
     * The geolocation information associated with the video.
     */
    location: IGeoPoint | null

    /**
     * The text description of the location where the video was recorded.
     */
    locationDescription: string | null

    /**
     * The date and time when the video was recorded. The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sssZ) format.
     */
    recordingDate: string | null
  }

  /**
   * Geographical coordinates of a point, in WGS84.
   */
  interface IGeoPoint {
    __typename: 'GeoPoint'

    /**
     * Altitude above the reference ellipsoid, in meters.
     */
    altitude: number | null

    /**
     * Latitude in degrees.
     */
    latitude: number | null

    /**
     * Longitude in degrees.
     */
    longitude: number | null
  }

  /**
   * Basic details about a video, including title, description, uploader, thumbnails and category.
   */
  interface IVideoSnippet {
    __typename: 'VideoSnippet'

    /**
     * The YouTube video category associated with the video.
     */
    categoryId: string | null

    /**
     * The ID that YouTube uses to uniquely identify the channel that the video was uploaded to.
     */
    channelId: string | null

    /**
     * Channel title for the channel that the video belongs to.
     */
    channelTitle: string | null

    /**
     * The default_audio_language property specifies the language spoken in the video's default audio track.
     */
    defaultAudioLanguage: string | null

    /**
     * The language of the videos's default snippet.
     */
    defaultLanguage: string | null

    /**
     * The video's description.
     */
    description: string | null

    /**
     * Indicates if the video is an upcoming/active live broadcast. Or it's "none" if
     * the video is not an upcoming/active live broadcast.
     */
    liveBroadcastContent: string | null

    /**
     * Localized snippet selected with the hl parameter. If no such localization
     * exists, this field is populated with the default snippet. (Read-only)
     */
    localized: IVideoLocalization | null

    /**
     * The date and time that the video was uploaded. The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAt: string | null

    /**
     * A list of keyword tags associated with the video. Tags may contain spaces.
     */
    tags: Array<string | null> | null

    /**
     * A map of thumbnail images associated with the video. For each object in the
     * map, the key is the name of the thumbnail image, and the value is an object
     * that contains other information about the thumbnail.
     */
    thumbnails: IThumbnailDetails | null

    /**
     * The video's title.
     */
    title: string | null
  }

  /**
   * Localized versions of certain video properties (e.g. title).
   */
  interface IVideoLocalization {
    __typename: 'VideoLocalization'

    /**
     * Localized version of the video's description.
     */
    description: string | null

    /**
     * Localized version of the video's title.
     */
    title: string | null
  }

  /**
   * Statistics about the video, such as the number of times the video was viewed or liked.
   */
  interface IVideoStatistics {
    __typename: 'VideoStatistics'

    /**
     * The number of comments for the video.
     */
    commentCount: string | null

    /**
     * The number of users who have indicated that they disliked the video by giving it a negative rating.
     */
    dislikeCount: string | null

    /**
     * The number of users who currently have the video marked as a favorite video.
     */
    favoriteCount: string | null

    /**
     * The number of users who have indicated that they liked the video by giving it a positive rating.
     */
    likeCount: string | null

    /**
     * The number of times the video has been viewed.
     */
    viewCount: string | null
  }

  /**
   * Basic details about a video category, such as its localized title.
   */
  interface IVideoStatus {
    __typename: 'VideoStatus'

    /**
     * This value indicates if the video can be embedded on another website.
     */
    embeddable: boolean | null

    /**
     * This value explains why a video failed to upload. This property is only
     * present if the uploadStatus property indicates that the upload failed.
     */
    failureReason: string | null

    /**
     * The video's license.
     */
    license: string | null

    /**
     * The video's privacy status.
     */
    privacyStatus: string | null

    /**
     * This value indicates if the extended video statistics on the watch page can be
     * viewed by everyone. Note that the view count, likes, etc will still be visible
     * if this is disabled.
     */
    publicStatsViewable: boolean | null

    /**
     * The date and time when the video is scheduled to publish. It can be set only
     * if the privacy status of the video is private. The value is specified in ISO
     * 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishAt: string | null

    /**
     * This value explains why YouTube rejected an uploaded video. This property is
     * only present if the uploadStatus property indicates that the upload was rejected.
     */
    rejectionReason: string | null

    /**
     * The status of the uploaded video.
     */
    uploadStatus: string | null
  }

  /**
   * Specifies suggestions on how to improve video content, including encoding hints, tag suggestions, and editor suggestions.
   */
  interface IVideoSuggestions {
    __typename: 'VideoSuggestions'

    /**
     * A list of video editing operations that might improve the video quality or playback experience of the uploaded video.
     */
    editorSuggestions: EditorSuggestions | null

    /**
     * A list of errors that will prevent YouTube from successfully processing the
     * uploaded video video. These errors indicate that, regardless of the video's
     * current processing status, eventually, that status will almost certainly be failed.
     */
    processingErrors: ProcessingErrors | null

    /**
     * A list of suggestions that may improve YouTube's ability to process the video.
     */
    processingHints: ProcessingHints | null

    /**
     * A list of reasons why YouTube may have difficulty transcoding the uploaded
     * video or that might result in an erroneous transcoding. These warnings are
     * generated before YouTube actually processes the uploaded video file. In
     * addition, they identify issues that are unlikely to cause the video processing
     * to fail but that might cause problems such as sync issues, video artifacts, or
     * a missing audio track.
     */
    processingWarnings: ProcessingWarnings | null

    /**
     * A list of keyword tags that could be added to the video's metadata to increase
     * the likelihood that users will locate your video when searching or browsing on YouTube.
     */
    tagSuggestions: Array<IVideoSuggestionsTagSuggestion | null> | null
  }

  const enum EditorSuggestions {
    audioQuietAudioSwap = 'audioQuietAudioSwap',
    videoAutoLevels = 'videoAutoLevels',
    videoCrop = 'videoCrop',
    videoStabilize = 'videoStabilize'
  }

  const enum ProcessingErrors {
    archiveFile = 'archiveFile',
    audioFile = 'audioFile',
    docFile = 'docFile',
    imageFile = 'imageFile',
    notAVideoFile = 'notAVideoFile',
    projectFile = 'projectFile',
    unsupportedSpatialAudioLayout = 'unsupportedSpatialAudioLayout'
  }

  const enum ProcessingHints {
    hdrVideo = 'hdrVideo',
    nonStreamableMov = 'nonStreamableMov',
    sendBestQualityVideo = 'sendBestQualityVideo',
    spatialAudio = 'spatialAudio',
    sphericalVideo = 'sphericalVideo',
    vrVideo = 'vrVideo'
  }

  const enum ProcessingWarnings {
    hasEditlist = 'hasEditlist',
    inconsistentResolution = 'inconsistentResolution',
    problematicAudioCodec = 'problematicAudioCodec',
    problematicHdrLookupTable = 'problematicHdrLookupTable',
    problematicVideoCodec = 'problematicVideoCodec',
    unknownAudioCodec = 'unknownAudioCodec',
    unknownContainer = 'unknownContainer',
    unknownVideoCodec = 'unknownVideoCodec',
    unsupportedHdrColorMetadata = 'unsupportedHdrColorMetadata',
    unsupportedHdrPixelFormat = 'unsupportedHdrPixelFormat',
    unsupportedSphericalProjectionType = 'unsupportedSphericalProjectionType',
    unsupportedVrStereoMode = 'unsupportedVrStereoMode'
  }

  /**
   * A single tag suggestion with it's relevance information.
   */
  interface IVideoSuggestionsTagSuggestion {
    __typename: 'VideoSuggestionsTagSuggestion'

    /**
     * A set of video categories for which the tag is relevant. You can use this
     * information to display appropriate tag suggestions based on the video category
     * that the video uploader associates with the video. By default, tag suggestions
     * are relevant for all categories if there are no restricts defined for the keyword.
     */
    categoryRestricts: Array<string | null> | null

    /**
     * The keyword tag suggested for the video.
     */
    tag: string | null
  }

  /**
   * Freebase topic information related to the video.
   */
  interface IVideoTopicDetails {
    __typename: 'VideoTopicDetails'

    /**
     * Similar to topic_id, except that these topics are merely relevant to the
     * video. These are topics that may be mentioned in, or appear in the video. You
     * can retrieve information about each topic using Freebase Topic API.
     */
    relevantTopicIds: Array<string | null> | null

    /**
     * A list of Wikipedia URLs that provide a high-level description of the video's content.
     */
    topicCategories: Array<string | null> | null

    /**
     * A list of Freebase topic IDs that are centrally associated with the video.
     * These are topics that are centrally featured in the video, and it can be said
     * that the video is mainly about each of these. You can retrieve information
     * about each topic using the Freebase Topic API.
     */
    topicIds: Array<string | null> | null
  }

  interface IMutation {
    __typename: 'Mutation'
    channelCreate: string | null
    videoPush: ITrack | null
    authenticate: string | null
    removeTrack: string | null
    markTrackAsPlayed: string | null
    channelJoin: IChannel | null
  }

  interface IChannelCreateOnMutationArguments {
    input: IChannelCreateInput
  }

  interface IVideoPushOnMutationArguments {
    input: IVideoPushInput
  }

  interface IRemoveTrackOnMutationArguments {
    input: IRemoveTrackInput
  }

  interface IMarkTrackAsPlayedOnMutationArguments {
    input: IMarkTrakAsPlayedInput
  }

  interface IChannelJoinOnMutationArguments {
    input: IChannelJoinInput
  }

  interface IChannelCreateInput {
    channelName?: string | null
  }

  interface IVideoPushInput {
    videoId: string
    channel: string
    title?: string | null
    time?: number | null
  }

  interface IRemoveTrackInput {
    track: string
  }

  interface IMarkTrakAsPlayedInput {
    track: string
    nextTrack?: string | null
  }

  interface IChannelJoinInput {
    channelId: string
  }

  /**
   * The auditDetails object encapsulates channel data that is relevant for YouTube Partners during the audit process.
   */
  interface IChannelAuditDetails {
    __typename: 'ChannelAuditDetails'

    /**
     * Whether or not the channel respects the community guidelines.
     */
    communityGuidelinesGoodStanding: boolean | null

    /**
     * Whether or not the channel has any unresolved claims.
     */
    contentIdClaimsGoodStanding: boolean | null

    /**
     * Whether or not the channel has any copyright strikes.
     */
    copyrightStrikesGoodStanding: boolean | null

    /**
     * Describes the general state of the channel. This field will always show if
     * there are any issues whatsoever with the channel. Currently this field
     * represents the result of the logical and operation over the community
     * guidelines good standing, the copyright strikes good standing and the content
     * ID claims good standing, but this may change in the future.
     */
    overallGoodStanding: boolean | null
  }

  /**
   * Branding properties of a YouTube channel.
   */
  interface IChannelBrandingSettings {
    __typename: 'ChannelBrandingSettings'

    /**
     * Branding properties for the channel view.
     */
    channel: IChannelSettings | null

    /**
     * Additional experimental branding properties.
     */
    hints: Array<IPropertyValue | null> | null

    /**
     * Branding properties for branding images.
     */
    image: IImageSettings | null

    /**
     * Branding properties for the watch page.
     */
    watch: IWatchSettings | null
  }

  /**
   * Branding properties for the channel view.
   */
  interface IChannelSettings {
    __typename: 'ChannelSettings'

    /**
     * The country of the channel.
     */
    country: string | null
    defaultLanguage: string | null

    /**
     * Which content tab users should see when viewing the channel.
     */
    defaultTab: string | null

    /**
     * Specifies the channel description.
     */
    description: string | null

    /**
     * Title for the featured channels tab.
     */
    featuredChannelsTitle: string | null

    /**
     * The list of featured channels.
     */
    featuredChannelsUrls: Array<string | null> | null

    /**
     * Lists keywords associated with the channel, comma-separated.
     */
    keywords: string | null

    /**
     * Whether user-submitted comments left on the channel page need to be approved by the channel owner to be publicly visible.
     */
    moderateComments: boolean | null

    /**
     * A prominent color that can be rendered on this channel page.
     */
    profileColor: string | null

    /**
     * Whether the tab to browse the videos should be displayed.
     */
    showBrowseView: boolean | null

    /**
     * Whether related channels should be proposed.
     */
    showRelatedChannels: boolean | null

    /**
     * Specifies the channel title.
     */
    title: string | null

    /**
     * The ID for a Google Analytics account to track and measure traffic to the channels.
     */
    trackingAnalyticsAccountId: string | null

    /**
     * The trailer of the channel, for users that are not subscribers.
     */
    unsubscribedTrailer: string | null
  }

  /**
   * A pair Property / Value.
   */
  interface IPropertyValue {
    __typename: 'PropertyValue'

    /**
     * A property.
     */
    property: string | null

    /**
     * The property's value.
     */
    value: string | null
  }

  /**
   * Branding properties for images associated with the channel.
   */
  interface IImageSettings {
    __typename: 'ImageSettings'

    /**
     * The URL for the background image shown on the video watch page. The image
     * should be 1200px by 615px, with a maximum file size of 128k.
     */
    backgroundImageUrl: ILocalizedProperty | null

    /**
     * This is used only in update requests; if it's set, we use this URL to generate all of the above banner URLs.
     */
    bannerExternalUrl: string | null

    /**
     * Banner image. Desktop size (1060x175).
     */
    bannerImageUrl: string | null

    /**
     * Banner image. Mobile size high resolution (1440x395).
     */
    bannerMobileExtraHdImageUrl: string | null

    /**
     * Banner image. Mobile size high resolution (1280x360).
     */
    bannerMobileHdImageUrl: string | null

    /**
     * Banner image. Mobile size (640x175).
     */
    bannerMobileImageUrl: string | null

    /**
     * Banner image. Mobile size low resolution (320x88).
     */
    bannerMobileLowImageUrl: string | null

    /**
     * Banner image. Mobile size medium/high resolution (960x263).
     */
    bannerMobileMediumHdImageUrl: string | null

    /**
     * Banner image. Tablet size extra high resolution (2560x424).
     */
    bannerTabletExtraHdImageUrl: string | null

    /**
     * Banner image. Tablet size high resolution (2276x377).
     */
    bannerTabletHdImageUrl: string | null

    /**
     * Banner image. Tablet size (1707x283).
     */
    bannerTabletImageUrl: string | null

    /**
     * Banner image. Tablet size low resolution (1138x188).
     */
    bannerTabletLowImageUrl: string | null

    /**
     * Banner image. TV size high resolution (1920x1080).
     */
    bannerTvHighImageUrl: string | null

    /**
     * Banner image. TV size extra high resolution (2120x1192).
     */
    bannerTvImageUrl: string | null

    /**
     * Banner image. TV size low resolution (854x480).
     */
    bannerTvLowImageUrl: string | null

    /**
     * Banner image. TV size medium resolution (1280x720).
     */
    bannerTvMediumImageUrl: string | null

    /**
     * The image map script for the large banner image.
     */
    largeBrandedBannerImageImapScript: ILocalizedProperty | null

    /**
     * The URL for the 854px by 70px image that appears below the video player in the
     * expanded video view of the video watch page.
     */
    largeBrandedBannerImageUrl: ILocalizedProperty | null

    /**
     * The image map script for the small banner image.
     */
    smallBrandedBannerImageImapScript: ILocalizedProperty | null

    /**
     * The URL for the 640px by 70px banner image that appears below the video player
     * in the default view of the video watch page.
     */
    smallBrandedBannerImageUrl: ILocalizedProperty | null

    /**
     * The URL for a 1px by 1px tracking pixel that can be used to collect statistics for views of the channel or video pages.
     */
    trackingImageUrl: string | null

    /**
     * The URL for the image that appears above the top-left corner of the video
     * player. This is a 25-pixel-high image with a flexible width that cannot exceed 170 pixels.
     */
    watchIconImageUrl: string | null
  }

  interface ILocalizedProperty {
    __typename: 'LocalizedProperty'
    default: string | null

    /**
     * The language of the default property.
     */
    defaultLanguage: ILanguageTag | null
    localized: Array<ILocalizedString | null> | null
  }

  interface ILanguageTag {
    __typename: 'LanguageTag'
    value: string | null
  }

  interface ILocalizedString {
    __typename: 'LocalizedString'
    language: string | null
    value: string | null
  }

  /**
   * Branding properties for the watch. All deprecated.
   */
  interface IWatchSettings {
    __typename: 'WatchSettings'

    /**
     * The text color for the video watch page's branded area.
     */
    backgroundColor: string | null

    /**
     * An ID that uniquely identifies a playlist that displays next to the video player.
     */
    featuredPlaylistId: string | null

    /**
     * The background color for the video watch page's branded area.
     */
    textColor: string | null
  }

  /**
   * Details about the content of a channel.
   */
  interface IChannelContentDetails {
    __typename: 'ChannelContentDetails'
    relatedPlaylists: IRelatedPlaylists | null
  }

  interface IRelatedPlaylists {
    __typename: 'relatedPlaylists'
    thisTypeHasNoFieldsAndGraphQLDontLikeThat: boolean | null
  }

  /**
   * The contentOwnerDetails object encapsulates channel data that is relevant for YouTube Partners linked with the channel.
   */
  interface IChannelContentOwnerDetails {
    __typename: 'ChannelContentOwnerDetails'

    /**
     * The ID of the content owner linked to the channel.
     */
    contentOwner: string | null

    /**
     * The date and time of when the channel was linked to the content owner. The
     * value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    timeLinked: string | null
  }

  /**
   * Pings that the app shall fire (authenticated by biscotti cookie). Each ping has
   * a context, in which the app must fire the ping, and a url identifying the ping.
   */
  interface IChannelConversionPing {
    __typename: 'ChannelConversionPing'

    /**
     * Defines the context of the ping.
     */
    context: string | null

    /**
     * The url (without the schema) that the player shall send the ping to. It's at
     * caller's descretion to decide which schema to use (http vs https) Example of a
     * returned url: //googleads.g.doubleclick.net/pagead/
     * viewthroughconversion/962985656/?data=path%3DtHe_path%3Btype%3D
     * cview%3Butuid%3DGISQtTNGYqaYl4sKxoVvKA&labe=default The caller must append
     * biscotti authentication (ms param in case of mobile, for example) to this ping.
     */
    conversionUrl: string | null
  }

  /**
   * The conversionPings object encapsulates information about conversion pings that need to be respected by the channel.
   */
  interface IChannelConversionPings {
    __typename: 'ChannelConversionPings'

    /**
     * Pings that the app shall fire (authenticated by biscotti cookie). Each ping
     * has a context, in which the app must fire the ping, and a url identifying the ping.
     */
    pings: Array<IChannelConversionPing | null> | null
  }

  /**
   * Channel localization setting
   */
  interface IChannelLocalization {
    __typename: 'ChannelLocalization'

    /**
     * The localized strings for channel's description.
     */
    description: string | null

    /**
     * The localized strings for channel's title.
     */
    title: string | null
  }

  /**
   * Basic details about a channel, including title, description and thumbnails.
   */
  interface IChannelSnippet {
    __typename: 'ChannelSnippet'

    /**
     * The country of the channel.
     */
    country: string | null

    /**
     * The custom url of the channel.
     */
    customUrl: string | null

    /**
     * The language of the channel's default title and description.
     */
    defaultLanguage: string | null

    /**
     * The description of the channel.
     */
    description: string | null

    /**
     * Localized title and description, read-only.
     */
    localized: IChannelLocalization | null

    /**
     * The date and time that the channel was created. The value is specified in ISO 8601 (YYYY-MM-DDThh:mm:ss.sZ) format.
     */
    publishedAt: string | null

    /**
     * A map of thumbnail images associated with the channel. For each object in the
     * map, the key is the name of the thumbnail image, and the value is an object
     * that contains other information about the thumbnail.
     */
    thumbnails: IThumbnailDetails | null

    /**
     * The channel's title.
     */
    title: string | null
  }

  /**
   * Statistics about a channel: number of subscribers, number of videos in the channel, etc.
   */
  interface IChannelStatistics {
    __typename: 'ChannelStatistics'

    /**
     * The number of comments for the channel.
     */
    commentCount: string | null

    /**
     * Whether or not the number of subscribers is shown for this user.
     */
    hiddenSubscriberCount: boolean | null

    /**
     * The number of subscribers that the channel has.
     */
    subscriberCount: string | null

    /**
     * The number of videos uploaded to the channel.
     */
    videoCount: string | null

    /**
     * The number of times the channel has been viewed.
     */
    viewCount: string | null
  }

  /**
   * JSON template for the status part of a channel.
   */
  interface IChannelStatus {
    __typename: 'ChannelStatus'

    /**
     * If true, then the user is linked to either a YouTube username or G+ account.
     * Otherwise, the user doesn't have a public YouTube identity.
     */
    isLinked: boolean | null

    /**
     * The long uploads status of this channel. See
     */
    longUploadsStatus: string | null

    /**
     * Privacy status of the channel.
     */
    privacyStatus: string | null
  }

  /**
   * Freebase topic information related to the channel.
   */
  interface IChannelTopicDetails {
    __typename: 'ChannelTopicDetails'

    /**
     * A list of Wikipedia URLs that describe the channel's content.
     */
    topicCategories: Array<string | null> | null

    /**
     * A list of Freebase topic IDs associated with the channel. You can retrieve
     * information about each topic using the Freebase Topic API.
     */
    topicIds: Array<string | null> | null
  }

  /**
   * Describes the spatial position of a visual widget inside a video. It is a union
   * of various position types, out of which only will be set one.
   */
  interface IInvideoPosition {
    __typename: 'InvideoPosition'

    /**
     * Describes in which corner of the video the visual widget will appear.
     */
    cornerPosition: string | null

    /**
     * Defines the position type.
     */
    type: string | null
  }

  /**
   * Describes an invideo promotion campaign consisting of multiple promoted items. A campaign belongs to a single channel_id.
   */
  interface IInvideoPromotion {
    __typename: 'InvideoPromotion'

    /**
     * The default temporal position within the video where the promoted item will be
     * displayed. Can be overriden by more specific timing in the item.
     */
    defaultTiming: IInvideoTiming | null

    /**
     * List of promoted items in decreasing priority.
     */
    items: Array<IPromotedItem | null> | null

    /**
     * The spatial position within the video where the promoted item will be displayed.
     */
    position: IInvideoPosition | null

    /**
     * Indicates whether the channel's promotional campaign uses "smart timing." This
     * feature attempts to show promotions at a point in the video when they are more
     * likely to be clicked and less likely to disrupt the viewing experience. This
     * feature also picks up a single promotion to show on each video.
     */
    useSmartTiming: boolean | null
  }

  /**
   * Describes a temporal position of a visual widget inside a video.
   */
  interface IInvideoTiming {
    __typename: 'InvideoTiming'

    /**
     * Defines the duration in milliseconds for which the promotion should be
     * displayed. If missing, the client should use the default.
     */
    durationMs: string | null

    /**
     * Defines the time at which the promotion will appear. Depending on the value of
     * type the value of the offsetMs field will represent a time offset from the
     * start or from the end of the video, expressed in milliseconds.
     */
    offsetMs: string | null

    /**
     * Describes a timing type. If the value is offsetFromStart, then the offsetMs
     * field represents an offset from the start of the video. If the value is
     * offsetFromEnd, then the offsetMs field represents an offset from the end of the video.
     */
    type: string | null
  }

  /**
   * Describes a single promoted item.
   */
  interface IPromotedItem {
    __typename: 'PromotedItem'

    /**
     * A custom message to display for this promotion. This field is currently ignored unless the promoted item is a website.
     */
    customMessage: string | null

    /**
     * Identifies the promoted item.
     */
    id: IPromotedItemId | null

    /**
     * If true, the content owner's name will be used when displaying the promotion.
     * This field can only be set when the update is made on behalf of the content owner.
     */
    promotedByContentOwner: boolean | null

    /**
     * The temporal position within the video where the promoted item will be
     * displayed. If present, it overrides the default timing.
     */
    timing: IInvideoTiming | null
  }

  /**
   * Describes a single promoted item id. It is a union of various possible types.
   */
  interface IPromotedItemId {
    __typename: 'PromotedItemId'

    /**
     * If type is recentUpload, this field identifies the channel from which to take
     * the recent upload. If missing, the channel is assumed to be the same channel
     * for which the invideoPromotion is set.
     */
    recentlyUploadedBy: string | null

    /**
     * Describes the type of the promoted item.
     */
    type: string | null

    /**
     * If the promoted item represents a video, this field represents the unique
     * YouTube ID identifying it. This field will be present only if type has the value video.
     */
    videoId: string | null

    /**
     * If the promoted item represents a website, this field represents the url
     * pointing to the website. This field will be present only if type has the value website.
     */
    websiteUrl: string | null
  }
}

// tslint:enable

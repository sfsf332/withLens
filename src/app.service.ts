import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
 
  getHello(): string {
    return `
    type Query {
      challenge(request: ChallengeRequest!): AuthChallengeResult!
      verify(request: VerifyRequest!): Boolean!
      txIdToTxHash(txId: TxId!): TxHash!
      explorePublications(
        request: ExplorePublicationRequest!
      ): ExplorePublicationResult!
      exploreProfiles(request: ExploreProfilesRequest!): ExploreProfileResult!
      feed(request: FeedRequest!): PaginatedFeedResult!
      feedHighlights(request: FeedHighlightsRequest!): PaginatedTimelineResult!
      timeline(request: TimelineRequest!): PaginatedTimelineResult!
        @deprecated(
          reason: "You should be using feed, this will not be supported after 15th November 2021, please migrate."
        )
      pendingApprovalFollows(
        request: PendingApprovalFollowsRequest!
      ): PendingApproveFollowsResult!
      doesFollow(request: DoesFollowRequest!): [DoesFollowResponse!]!
      following(request: FollowingRequest!): PaginatedFollowingResult!
      followers(request: FollowersRequest!): PaginatedFollowersResult!
      followerNftOwnedTokenIds(
        request: FollowerNftOwnedTokenIdsRequest!
      ): FollowerNftOwnedTokenIds
      mutualFollowersProfiles(
        request: MutualFollowersProfilesQueryRequest!
      ): PaginatedProfileResult!
      ping: String!
      hasTxHashBeenIndexed(
        request: HasTxHashBeenIndexedRequest!
      ): TransactionResult!
      enabledModuleCurrencies: [Erc20!]!
      approvedModuleAllowanceAmount(
        request: ApprovedModuleAllowanceAmountRequest!
      ): [ApprovedAllowanceAmount!]!
      generateModuleCurrencyApprovalData(
        request: GenerateModuleCurrencyApprovalDataRequest!
      ): GenerateModuleCurrencyApproval!
      profileFollowModuleBeenRedeemed(
        request: ProfileFollowModuleBeenRedeemedRequest!
      ): Boolean!
      enabledModules: EnabledModules!
      unknownEnabledModules: EnabledModules!
      nfts(request: NFTsRequest!): NFTsResult!
      nftOwnershipChallenge(
        request: NftOwnershipChallengeRequest!
      ): NftOwnershipChallengeResult!
      notifications(request: NotificationRequest!): PaginatedNotificationResult!
      profiles(request: ProfileQueryRequest!): PaginatedProfileResult!
      profile(request: SingleProfileQueryRequest!): Profile
      recommendedProfiles(options: RecommendedProfileOptions): [Profile!]!
      defaultProfile(request: DefaultProfileRequest!): Profile
      globalProtocolStats(request: GlobalProtocolStatsRequest): GlobalProtocolStats!
      publications(request: PublicationsQueryRequest!): PaginatedPublicationResult!
      publication(request: PublicationQueryRequest!): Publication
      whoCollectedPublication(
        request: WhoCollectedPublicationRequest!
      ): PaginatedWhoCollectedResult!
      profilePublicationsForSale(
        request: ProfilePublicationsForSaleRequest!
      ): PaginatedProfilePublicationsForSaleResult!
      allPublicationsTags(
        request: AllPublicationsTagsRequest!
      ): PaginatedAllPublicationsTagsResult!
      search(request: SearchQueryRequest!): SearchResult!
      userSigNonces: UserSigNonces!
      claimableHandles: ClaimableHandles!
      claimableStatus: ClaimStatus!
      isIDKitPhoneVerified: Boolean!
      internalPublicationFilter(
        request: InternalPublicationsFilterRequest!
      ): PaginatedPublicationResult!
      profileOnChainIdentity(
        request: ProfileOnChainIdentityRequest!
      ): [OnChainIdentity!]!
    
      # Get the list of profile interests
      profileInterests: [ProfileInterest!]!
      proxyActionStatus(
        proxyActionId: ProxyActionId!
      ): ProxyActionStatusResultUnion!
      validatePublicationMetadata(
        request: ValidatePublicationMetadataRequest!
      ): PublicationValidateMetadataResult!
      publicationMetadataStatus(
        request: GetPublicationMetadataStatusRequest!
      ): PublicationMetadataStatus!
      whoReactedPublication(
        request: WhoReactedPublicationRequest!
      ): PaginatedWhoReactedResult!
      profilePublicationRevenue(
        request: ProfilePublicationRevenueQueryRequest!
      ): ProfilePublicationRevenueResult!
      publicationRevenue(
        request: PublicationRevenueQueryRequest!
      ): PublicationRevenue
      profileFollowRevenue(
        request: ProfileFollowRevenueQueryRequest!
      ): FollowRevenueResult!
      rel(request: RelRequest!): Void
      cur(request: CurRequest!): [String!]!
    }
    
    # The auth challenge result
    type AuthChallengeResult {
      # The text to sign
      text: String!
    }
    
    # The challenge request
    input ChallengeRequest {
      # The ethereum address you want to login with
      address: EthereumAddress!
    }
    
    # Ethereum address custom scalar type
    scalar EthereumAddress
    
    # The access request
    input VerifyRequest {
      # The access token
      accessToken: Jwt!
    }
    
    # jwt custom scalar type
    scalar Jwt
    
    # The tx hash
    scalar TxHash
    
    # The tx id
    scalar TxId
    
    # The paginated publication result
    type ExplorePublicationResult {
      items: [Publication!]!
      pageInfo: PaginatedResultInfo!
    }
    
    union Publication = Post | Comment | Mirror
    
    # The social post
    type Post {
      # The internal publication id
      id: InternalPublicationId!
    
      # The profile ref
      profile: Profile!
    
      # The publication stats
      stats: PublicationStats!
    
      # The metadata for the post
      metadata: MetadataOutput!
    
      onChainContentURI: String!
    
      # The date the post was created on
      createdAt: DateTime!
    
      # The collect module
      collectModule: CollectModule!
    
      # The reference module
      referenceModule: ReferenceModule
    
      # ID of the source
      appId: Sources
    
      # If the publication has been hidden if it has then the content and media is not available
      hidden: Boolean!
    
      # The contract address for the collect nft.. if its null it means nobody collected yet as it lazy deployed
      collectNftAddress: ContractAddress
    
      # Indicates if the publication is gated behind some access criteria
      isGated: Boolean!
    
      # Indicates if the publication is data availability post
      isDataAvailability: Boolean!
    
      # The data availability proofs you can fetch from
      dataAvailabilityProofs: String
    
      # Who collected it, this is used for timeline results and like this for better caching for the client
      collectedBy: Wallet
        @deprecated(
          reason: "use "feed' query, timeline query will be killed on the 15th November. This includes this field."
        )
      reaction(request: ReactionFieldResolverRequest): ReactionTypes
      hasCollectedByMe(isFinalisedOnChain: Boolean): Boolean!
      canComment(profileId: ProfileId): CanCommentResponse!
      canMirror(profileId: ProfileId): CanMirrorResponse!
      canDecrypt(
        profileId: ProfileId
        address: EthereumAddress
      ): CanDecryptResponse!
      mirrors(by: ProfileId): [InternalPublicationId!]!
    }
    
    # Internal publication id custom scalar type
    scalar InternalPublicationId
    
    # The Profile
    type Profile {
      # The profile id
      id: ProfileId!
    
      # Name of the profile
      name: String
    
      # Bio of the profile
      bio: String
    
      # Follow nft address
      followNftAddress: ContractAddress
    
      # Metadata url
      metadata: Url
    
      # The profile handle
      handle: Handle!
    
      # The picture for the profile
      picture: ProfileMedia
    
      # The cover picture for the profile
      coverPicture: ProfileMedia
    
      # Who owns the profile
      ownedBy: EthereumAddress!
    
      # The dispatcher
      dispatcher: Dispatcher
    
      # Profile stats
      stats: ProfileStats!
    
      # The follow module
      followModule: FollowModule
    
      # Is the profile default
      isDefault: Boolean!
    
      # Optionals param to add extra attributes on the metadata
      attributes: [Attribute!]
    
      # The on chain identity
      onChainIdentity: OnChainIdentity!
    
      # The profile interests
      interests: [ProfileInterest!]
      isFollowedByMe(isFinalisedOnChain: Boolean): Boolean!
      isFollowing(who: ProfileId): Boolean!
    }
    
    # ProfileId custom scalar type
    scalar ProfileId
    
    # Contract address custom scalar type
    scalar ContractAddress
    
    # Url scalar type
    scalar Url
    
    # handle custom scalar type
    scalar Handle
    
    union ProfileMedia = NftImage | MediaSet
    
    # The NFT image
    type NftImage {
      # The contract address
      contractAddress: ContractAddress!
    
      # The token id of the nft
      tokenId: String!
    
      # The token image nft
      uri: Url!
    
      # The token image nft
      chainId: Int!
    
      # If the NFT is verified
      verified: Boolean!
    }
    
    # The Media Set
    type MediaSet {
      # Original media
      original: Media!
    
      # Small media - will always be null on the public API
      small: Media @deprecated(reason: "should not be used will always be null")
    
      # Medium media - will always be null on the public API
      medium: Media @deprecated(reason: "should not be used will always be null")
    }
    
    # The Media url
    type Media {
      # The token image nft
      url: Url!
    
      # Width - will always be null on the public API
      width: Int
    
      # Height - will always be null on the public API
      height: Int
    
      # Size - will always be null on the public API
      size: Int
    
      # The image/audio/video mime type for the publication
      mimeType: MimeType
    
      # The alt tags for accessibility
      altTag: String
    
      # The cover for any video or audio you attached
      cover: Url
    }
    
    # mimetype custom scalar type
    scalar MimeType
    
    # The dispatcher
    type Dispatcher {
      # The dispatcher address
      address: EthereumAddress!
    
      # If the dispatcher can use the relay
      canUseRelay: Boolean!
    }
    
    # The Profile Stats
    type ProfileStats {
      id: ProfileId!
    
      # Total follower count
      totalFollowers: Int!
    
      # Total following count (remember the wallet follows not profile so will be same for every profile they own)
      totalFollowing: Int!
    
      # Total post count
      totalPosts: Int!
    
      # Total comment count
      totalComments: Int!
    
      # Total mirror count
      totalMirrors: Int!
    
      # Total publication count
      totalPublications: Int!
    
      # Total collects count
      totalCollects: Int!
      commentsTotal(forSources: [Sources!]!): Int!
      postsTotal(forSources: [Sources!]!): Int!
      mirrorsTotal(forSources: [Sources!]!): Int!
      publicationsTotal(forSources: [Sources!]!): Int!
    }
    
    # Sources custom scalar type
    scalar Sources
    
    union FollowModule =
        FeeFollowModuleSettings
      | ProfileFollowModuleSettings
      | RevertFollowModuleSettings
      | UnknownFollowModuleSettings
    
    type FeeFollowModuleSettings {
      # The follow modules enum
      type: FollowModules!
      contractAddress: ContractAddress!
    
      # The collect module amount info
      amount: ModuleFeeAmount!
    
      # The collect module recipient address
      recipient: EthereumAddress!
    }
    
    # The follow module types
    enum FollowModules {
      FeeFollowModule
      RevertFollowModule
      ProfileFollowModule
      UnknownFollowModule
    }
    
    type ModuleFeeAmount {
      # The erc20 token info
      asset: Erc20!
    
      # Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal.
      value: String!
    }
    
    # The erc20 type
    type Erc20 {
      # Name of the symbol
      name: String!
    
      # Symbol for the token
      symbol: String!
    
      # Decimal places for the token
      decimals: Int!
    
      # The erc20 address
      address: ContractAddress!
    }
    
    type ProfileFollowModuleSettings {
      # The follow module enum
      type: FollowModules!
      contractAddress: ContractAddress!
    }
    
    type RevertFollowModuleSettings {
      # The follow module enum
      type: FollowModules!
      contractAddress: ContractAddress!
    }
    
    type UnknownFollowModuleSettings {
      # The follow modules enum
      type: FollowModules!
      contractAddress: ContractAddress!
    
      # The data used to setup the module which you can decode with your known ABI
      followModuleReturnData: FollowModuleData!
    }
    
    # follow module data scalar type
    scalar FollowModuleData
    
    # The Profile
    type Attribute {
      # The display type
      displayType: String
    
      # The trait type - can be anything its the name it will render so include spaces
      traitType: String
    
      # identifier of this attribute, we will update by this id
      key: String!
    
      # Value attribute
      value: String!
    }
    
    type OnChainIdentity {
      # The POH status
      proofOfHumanity: Boolean!
    
      # The ens information
      ens: EnsOnChainIdentity
    
      # The sybil dot org information
      sybilDotOrg: SybilDotOrgIdentity!
    
      # The worldcoin identity
      worldcoin: WorldcoinIdentity!
    }
    
    type EnsOnChainIdentity {
      # The default ens mapped to this address
      name: Ens
    }
    
    # Ens custom scalar type
    scalar Ens
    
    type SybilDotOrgIdentity {
      # The sybil dot org status
      verified: Boolean!
      source: SybilDotOrgIdentitySource!
    }
    
    type SybilDotOrgIdentitySource {
      twitter: SybilDotOrgTwitterIdentity!
    }
    
    type SybilDotOrgTwitterIdentity {
      handle: String
    }
    
    type WorldcoinIdentity {
      # If the profile has verified as a user
      isHuman: Boolean!
    }
    
    # ProfileInterest custom scalar type
    scalar ProfileInterest
    
    # The publication stats
    type PublicationStats {
      # The publication id
      id: InternalPublicationId!
    
      # The total amount of mirrors
      totalAmountOfMirrors: Int!
    
      # The total amount of collects
      totalAmountOfCollects: Int!
    
      # The total amount of comments
      totalAmountOfComments: Int!
    
      # The total amount of downvotes
      totalUpvotes: Int!
    
      # The total amount of upvotes
      totalDownvotes: Int!
      commentsTotal(forSources: [Sources!]!): Int!
    }
    
    # The metadata output
    type MetadataOutput {
      # The metadata name
      name: String
    
      # This is the metadata description
      description: Markdown
    
      # This is the metadata content for the publication, should be markdown
      content: Markdown
    
      # This is the image attached to the metadata and the property used to show the NFT!
      image: Url
    
      # The image cover for video/music publications
      cover: MediaSet
    
      # The images/audios/videos for the publication
      media: [MediaSet!]!
    
      # The attributes
      attributes: [MetadataAttributeOutput!]!
    
      # The locale of the publication,
      locale: Locale
    
      # The tags for the publication
      tags: [String!]!
    
      # The content warning for the publication
      contentWarning: PublicationContentWarning
    
      # The main focus of the publication
      mainContentFocus: PublicationMainFocus!
    
      # The main focus of the publication
      animatedUrl: Url
    
      # The publication's encryption params in case it's encrypted
      encryptionParams: EncryptionParamsOutput
    }
    
    # Markdown scalar type
    scalar Markdown
    
    # The metadata attribute output
    type MetadataAttributeOutput {
      # The display type
      displayType: PublicationMetadataDisplayTypes
    
      # The trait type - can be anything its the name it will render so include spaces
      traitType: String
    
      # The value
      value: String
    }
    
    # The publication metadata display types
    enum PublicationMetadataDisplayTypes {
      number
      string
      date
    }
    
    # Locale scalar type
    scalar Locale
    
    # The publication content warning
    enum PublicationContentWarning {
      NSFW
      SENSITIVE
      SPOILER
    }
    
    # The publication main focus
    enum PublicationMainFocus {
      VIDEO
      IMAGE
      ARTICLE
      TEXT_ONLY
      AUDIO
      LINK
      EMBED
    }
    
    # The metadata encryption params
    type EncryptionParamsOutput {
      # The provider-specific encryption params
      providerSpecificParams: ProviderSpecificParamsOutput!
    
      # The encryption provider
      encryptionProvider: EncryptionProvider!
    
      # The access conditions
      accessCondition: AccessConditionOutput!
    
      # The encrypted fields
      encryptedFields: EncryptedFieldsOutput!
    }
    
    # The provider-specific encryption params
    type ProviderSpecificParamsOutput {
      # The encryption key
      encryptionKey: ContentEncryptionKey!
    }
    
    # ContentEncryptionKey scalar type
    scalar ContentEncryptionKey
    
    # The gated publication encryption provider
    enum EncryptionProvider {
      LIT_PROTOCOL
    }
    
    # The access conditions for the publication
    type AccessConditionOutput {
      # NFT ownership condition
      nft: NftOwnershipOutput
    
      # ERC20 token ownership condition
      token: Erc20OwnershipOutput
    
      # EOA ownership condition
      eoa: EoaOwnershipOutput
    
      # Profile ownership condition
      profile: ProfileOwnershipOutput
    
      # Profile follow condition
      follow: FollowConditionOutput
    
      # Profile follow condition
      collect: CollectConditionOutput
    
      # AND condition
      and: AndConditionOutput
    
      # OR condition
      or: OrConditionOutput
    }
    
    type NftOwnershipOutput {
      # The NFT collection's ethereum address
      contractAddress: ContractAddress!
    
      # The NFT chain id
      chainID: ChainId!
    
      # The unlocker contract type
      contractType: ContractType!
    
      # The optional token ID(s) to check for ownership
      tokenIds: [TokenId!]
    }
    
    # ChainId custom scalar type
    scalar ChainId
    
    # The gated publication access criteria contract types
    enum ContractType {
      ERC721
      ERC1155
      ERC20
    }
    
    # The NFT token id
    scalar TokenId
    
    type Erc20OwnershipOutput {
      # The ERC20 token's ethereum address
      contractAddress: ContractAddress!
    
      # The amount of tokens required to access the content
      chainID: ChainId!
    
      # The amount of tokens required to access the content
      amount: String!
    
      # The amount of decimals of the ERC20 contract
      decimals: Float!
    
      # The operator to use when comparing the amount of tokens
      condition: ScalarOperator!
    }
    
    # The gated publication access criteria scalar operators
    enum ScalarOperator {
      EQUAL
      NOT_EQUAL
      GREATER_THAN
      GREATER_THAN_OR_EQUAL
      LESS_THAN
      LESS_THAN_OR_EQUAL
    }
    
    type EoaOwnershipOutput {
      # The address that will have access to the content
      address: EthereumAddress!
    }
    
    # Condition that signifies if address has access to profile
    type ProfileOwnershipOutput {
      # The profile id
      profileId: ProfileId!
    }
    
    type FollowConditionOutput {
      # The profile id of the gated profile
      profileId: ProfileId!
    }
    
    # Condition that signifies if address or profile has collected a publication
    type CollectConditionOutput {
      # The publication id that has to be collected to unlock content
      publicationId: InternalPublicationId
    
      # True if the content will be unlocked for this specific publication
      thisPublication: Boolean
    }
    
    type AndConditionOutput {
      # The list of conditions to apply AND to. You can only use nested boolean conditions at the root level.
      criteria: [AccessConditionOutput!]!
    }
    
    type OrConditionOutput {
      # The list of conditions to apply OR to. You can only use nested boolean conditions at the root level.
      criteria: [AccessConditionOutput!]!
    }
    
    # The encrypted fields
    type EncryptedFieldsOutput {
      # The encrypted content field
      content: EncryptedValueScalar
    
      # The encrypted image field
      image: EncryptedValueScalar
    
      # The encrypted media field
      media: [EncryptedMediaSet!]
    
      # The encrypted animation_url field
      animation_url: EncryptedValueScalar
    
      # The encrypted external_url field
      external_url: EncryptedValueScalar
    }
    
    # EncryptedValue custom scalar type
    scalar EncryptedValueScalar
    
    # The encrypted media set
    type EncryptedMediaSet {
      # Original media
      original: EncryptedMedia!
    
      # Small media - will always be null on the public API
      small: EncryptedMedia
        @deprecated(reason: "should not be used will always be null")
    
      # Medium media - will always be null on the public API
      medium: EncryptedMedia
        @deprecated(reason: "should not be used will always be null")
    }
    
    # The Encrypted Media url and metadata
    type EncryptedMedia {
      # The encrypted value for the URL
      url: Url!
    
      # Width - will always be null on the public API
      width: Int
    
      # Height - will always be null on the public API
      height: Int
    
      # Size - will always be null on the public API
      size: Int
    
      # The image/audio/video mime type for the publication
      mimeType: MimeType
    
      # The encrypted alt tags for accessibility
      altTag: EncryptedValueScalar
    
      # The encrypted cover for any video or audio you attached
      cover: EncryptedValueScalar
    }
    
    # The javascript Date as string. Type represents date and time as the ISO Date string.
    scalar DateTime
    
    union CollectModule =
        FreeCollectModuleSettings
      | FeeCollectModuleSettings
      | LimitedFeeCollectModuleSettings
      | LimitedTimedFeeCollectModuleSettings
      | RevertCollectModuleSettings
      | TimedFeeCollectModuleSettings
      | UnknownCollectModuleSettings
    
    type FreeCollectModuleSettings {
      # The collect modules enum
      type: CollectModules!
      contractAddress: ContractAddress!
    
      # Follower only
      followerOnly: Boolean!
    }
    
    # The collect module types
    enum CollectModules {
      LimitedFeeCollectModule
      FeeCollectModule
      LimitedTimedFeeCollectModule
      TimedFeeCollectModule
      AaveFeeCollectModule
      RevertCollectModule
      FreeCollectModule
      MultirecipientFeeCollectModule
      ERC4626FeeCollectModule
      UnknownCollectModule
    }
    
    type FeeCollectModuleSettings {
      # The collect modules enum
      type: CollectModules!
      contractAddress: ContractAddress!
    
      # The collect module amount info
      amount: ModuleFeeAmount!
    
      # The collect module recipient address
      recipient: EthereumAddress!
    
      # The collect module referral fee
      referralFee: Float!
    
      # Follower only
      followerOnly: Boolean!
    }
    
    type LimitedFeeCollectModuleSettings {
      # The collect modules enum
      type: CollectModules!
      contractAddress: ContractAddress!
    
      # The collect module limit
      collectLimit: String!
    
      # The collect module amount info
      amount: ModuleFeeAmount!
    
      # The collect module recipient address
      recipient: EthereumAddress!
    
      # The collect module referral fee
      referralFee: Float!
    
      # Follower only
      followerOnly: Boolean!
    }
    
    type LimitedTimedFeeCollectModuleSettings {
      # The collect modules enum
      type: CollectModules!
      contractAddress: ContractAddress!
    
      # The collect module limit
      collectLimit: String!
    
      # The collect module amount info
      amount: ModuleFeeAmount!
    
      # The collect module recipient address
      recipient: EthereumAddress!
    
      # The collect module referral fee
      referralFee: Float!
    
      # Follower only
      followerOnly: Boolean!
    
      # The collect module end timestamp
      endTimestamp: DateTime!
    }
    
    type RevertCollectModuleSettings {
      # The collect modules enum
      type: CollectModules!
      contractAddress: ContractAddress!
    }
    
    type TimedFeeCollectModuleSettings {
      # The collect modules enum
      type: CollectModules!
      contractAddress: ContractAddress!
    
      # The collect module amount info
      amount: ModuleFeeAmount!
    
      # The collect module recipient address
      recipient: EthereumAddress!
    
      # The collect module referral fee
      referralFee: Float!
    
      # Follower only
      followerOnly: Boolean!
    
      # The collect module end timestamp
      endTimestamp: DateTime!
    }
    
    type UnknownCollectModuleSettings {
      # The collect modules enum
      type: CollectModules!
      contractAddress: ContractAddress!
    
      # The data used to setup the module which you can decode with your known ABI
      collectModuleReturnData: CollectModuleData!
    }
    
    # collect module data scalar type
    scalar CollectModuleData
    
    union ReferenceModule =
        FollowOnlyReferenceModuleSettings
      | UnknownReferenceModuleSettings
      | DegreesOfSeparationReferenceModuleSettings
    
    type FollowOnlyReferenceModuleSettings {
      # The reference modules enum
      type: ReferenceModules!
      contractAddress: ContractAddress!
    }
    
    # The reference module types
    enum ReferenceModules {
      FollowerOnlyReferenceModule
      DegreesOfSeparationReferenceModule
      UnknownReferenceModule
    }
    
    type UnknownReferenceModuleSettings {
      # The reference modules enum
      type: ReferenceModules!
      contractAddress: ContractAddress!
    
      # The data used to setup the module which you can decode with your known ABI
      referenceModuleReturnData: ReferenceModuleData!
    }
    
    # reference module data scalar type
    scalar ReferenceModuleData
    
    type DegreesOfSeparationReferenceModuleSettings {
      # The reference modules enum
      type: ReferenceModules!
      contractAddress: ContractAddress!
    
      # Applied to comments
      commentsRestricted: Boolean!
    
      # Applied to mirrors
      mirrorsRestricted: Boolean!
    
      # Degrees of separation
      degreesOfSeparation: Int!
    }
    
    type Wallet {
      address: EthereumAddress!
    
      # The default profile for the wallet for now it is just their first profile, this will be the default profile they picked soon enough
      defaultProfile: Profile
    }
    
    # Reaction types
    enum ReactionTypes {
      UPVOTE
      DOWNVOTE
    }
    
    input ReactionFieldResolverRequest {
      # Profile id
      profileId: ProfileId
    }
    
    type CanCommentResponse {
      result: Boolean!
    }
    
    type CanMirrorResponse {
      result: Boolean!
    }
    
    type CanDecryptResponse {
      result: Boolean!
      reasons: [DecryptFailReason!]
      extraDetails: String
    }
    
    # The reason why a profile cannot decrypt a publication
    enum DecryptFailReason {
      UNAUTHORIZED_ADDRESS
      DOES_NOT_OWN_NFT
      DOES_NOT_OWN_PROFILE
      DOES_NOT_FOLLOW_PROFILE
      HAS_NOT_COLLECTED_PUBLICATION
      UNAUTHORIZED_BALANCE
      PROFILE_DOES_NOT_EXIST
      MISSING_ENCRYPTION_PARAMS
      FOLLOW_NOT_FINALISED_ON_CHAIN
      COLLECT_NOT_FINALISED_ON_CHAIN
      CAN_NOT_DECRYPT
    }
    
    # The social comment
    type Comment {
      # The internal publication id
      id: InternalPublicationId!
    
      # The profile ref
      profile: Profile!
    
      # The publication stats
      stats: PublicationStats!
    
      # The metadata for the post
      metadata: MetadataOutput!
    
      # The on chain content uri could be ipfs:// or https
      onChainContentURI: String!
    
      # The date the post was created on
      createdAt: DateTime!
    
      # The collect module
      collectModule: CollectModule!
    
      # The reference module
      referenceModule: ReferenceModule
    
      # ID of the source
      appId: Sources
    
      # If the publication has been hidden if it has then the content and media is not available
      hidden: Boolean!
    
      # The contract address for the collect nft.. if its null it means nobody collected yet as it lazy deployed
      collectNftAddress: ContractAddress
    
      # Indicates if the publication is gated behind some access criteria
      isGated: Boolean!
    
      # Indicates if the publication is data availability post
      isDataAvailability: Boolean!
    
      # The data availability proofs you can fetch from
      dataAvailabilityProofs: String
    
      # The top level post/mirror this comment lives on
      mainPost: MainPostReference!
    
      # Which comment this points to if its null the pointer too deep so do another query to find it out
      commentOn: Publication
    
      # This will bring back the first comment of a comment and only be defined if using publication query and commentOf
      firstComment: Comment
    
      # Who collected it, this is used for timeline results and like this for better caching for the client
      collectedBy: Wallet
      reaction(request: ReactionFieldResolverRequest): ReactionTypes
      hasCollectedByMe(isFinalisedOnChain: Boolean): Boolean!
      canComment(profileId: ProfileId): CanCommentResponse!
      canMirror(profileId: ProfileId): CanMirrorResponse!
      canDecrypt(
        profileId: ProfileId
        address: EthereumAddress
      ): CanDecryptResponse!
      mirrors(by: ProfileId): [InternalPublicationId!]!
    }
    
    union MainPostReference = Post | Mirror
    
    # The social mirror
    type Mirror {
      # The internal publication id
      id: InternalPublicationId!
    
      # The profile ref
      profile: Profile!
    
      # The publication stats
      stats: PublicationStats!
    
      # The metadata for the post
      metadata: MetadataOutput!
    
      # The on chain content uri could be ipfs:// or https
      onChainContentURI: String!
    
      # The date the post was created on
      createdAt: DateTime!
    
      # The collect module
      collectModule: CollectModule!
    
      # The reference module
      referenceModule: ReferenceModule
    
      # ID of the source
      appId: Sources
    
      # If the publication has been hidden if it has then the content and media is not available
      hidden: Boolean!
    
      # The contract address for the collect nft.. if its null it means nobody collected yet as it lazy deployed
      collectNftAddress: ContractAddress
    
      # Indicates if the publication is gated behind some access criteria
      isGated: Boolean!
    
      # Indicates if the publication is data availability post
      isDataAvailability: Boolean!
    
      # The data availability proofs you can fetch from
      dataAvailabilityProofs: String
    
      # The mirror publication
      mirrorOf: MirrorablePublication!
      reaction(request: ReactionFieldResolverRequest): ReactionTypes
      hasCollectedByMe(isFinalisedOnChain: Boolean): Boolean!
      canComment(profileId: ProfileId): CanCommentResponse!
      canMirror(profileId: ProfileId): CanMirrorResponse!
      canDecrypt(
        profileId: ProfileId
        address: EthereumAddress
      ): CanDecryptResponse!
    }
    
    union MirrorablePublication = Post | Comment
    
    # The paginated result info
    type PaginatedResultInfo {
      # Cursor to query the actual results
      prev: Cursor
    
      # Cursor to query next results
      next: Cursor
    
      # The total number of entities the pagination iterates over. If its null then its not been worked out due to it being an expensive query and not really needed for the client. All main counters are in counter tables to allow them to be faster fetching.
      totalCount: Int
    }
    
    # Cursor custom scalar type
    scalar Cursor
    
    input ExplorePublicationRequest {
      limit: LimitScalar
      cursor: Cursor
      timestamp: TimestampScalar
      sortCriteria: PublicationSortCriteria!
    
      # The App Id
      sources: [Sources!] = []
    
      # The publication types you want to query
      publicationTypes: [PublicationTypes!]
    
      # If you want the randomizer off (default on)
      noRandomize: Boolean
    
      # If you wish to exclude any results for profile ids
      excludeProfileIds: [ProfileId!]
      metadata: PublicationMetadataFilters
      customFilters: [CustomFiltersTypes!] = []
    }
    
    # limit custom scalar type
    scalar LimitScalar
    
    # timestamp date custom scalar type
    scalar TimestampScalar
    
    # Publication sort criteria
    enum PublicationSortCriteria {
      TOP_COMMENTED
      TOP_COLLECTED
      TOP_MIRRORED
      CURATED_PROFILES
      LATEST
    }
    
    # The publication types
    enum PublicationTypes {
      POST
      COMMENT
      MIRROR
    }
    
    # Publication metadata filters
    input PublicationMetadataFilters {
      # IOS 639-1 language code aka en or it and ISO 3166-1 alpha-2 region code aka US or IT aka en-US or it-IT. You can just filter on language if you wish.
      locale: Locale
      contentWarning: PublicationMetadataContentWarningFilter
      mainContentFocus: [PublicationMainFocus!] = [
        ARTICLE
        AUDIO
        VIDEO
        EMBED
        IMAGE
        LINK
        TEXT_ONLY
      ]
      tags: PublicationMetadataTagsFilter
    }
    
    # Publication metadata content waring filters
    input PublicationMetadataContentWarningFilter {
      # By default all content warnings will be hidden you can include them in your query by adding them to this array.
      includeOneOf: [PublicationContentWarning!]
    }
    
    # Publication metadata tag filter
    input PublicationMetadataTagsFilter {
      # Needs to only match one of
      oneOf: [String!]
    
      # Needs to only match all
      all: [String!]
    }
    
    # The custom filters types
    enum CustomFiltersTypes {
      GARDENERS
    }
    
    # The paginated publication result
    type ExploreProfileResult {
      items: [Profile!]!
      pageInfo: PaginatedResultInfo!
    }
    
    input ExploreProfilesRequest {
      limit: LimitScalar
      cursor: Cursor
      timestamp: TimestampScalar
      sortCriteria: ProfileSortCriteria!
      customFilters: [CustomFiltersTypes!] = []
    }
    
    # profile sort criteria
    enum ProfileSortCriteria {
      CREATED_ON
      MOST_FOLLOWERS
      LATEST_CREATED
      MOST_POSTS
      MOST_COMMENTS
      MOST_MIRRORS
      MOST_PUBLICATION
      MOST_COLLECTS
    }
    
    # The paginated feed result
    type PaginatedFeedResult {
      items: [FeedItem!]!
      pageInfo: PaginatedResultInfo!
    }
    
    type FeedItem {
      root: FeedItemRoot!
    
      # The elected mirror will be the first Mirror publication within the page results set
      electedMirror: ElectedMirror
    
      # Sorted by most recent first. Up to page size - 1 mirrors
      mirrors: [MirrorEvent!]!
    
      # Sorted by most recent first. Resolves defaultProfile and if null omits the wallet collect event from the list.
      collects: [CollectedEvent!]!
    
      # Sorted by most recent first. Up to page size - 1 reactions
      reactions: [ReactionEvent!]!
    
      # Sorted by most recent first. Up to page size - 1 comments.
      comments: [Comment!]
    }
    
    union FeedItemRoot = Post | Comment
    
    type ElectedMirror {
      mirrorId: InternalPublicationId!
      profile: Profile!
      timestamp: DateTime!
    }
    
    type MirrorEvent {
      profile: Profile!
      timestamp: DateTime!
    }
    
    type CollectedEvent {
      profile: Profile!
      timestamp: DateTime!
    }
    
    type ReactionEvent {
      profile: Profile!
      reaction: ReactionTypes!
      timestamp: DateTime!
    }
    
    input FeedRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # The profile id
      profileId: ProfileId!
    
      # Filter your feed to whatever you wish
      feedEventItemTypes: [FeedEventItemType!] = [
        POST
        COMMENT
        MIRROR
        COLLECT_POST
        COLLECT_COMMENT
      ]
    
      # The App Id
      sources: [Sources!] = []
      metadata: PublicationMetadataFilters
    }
    
    # The feed event item filter types
    enum FeedEventItemType {
      POST
      COMMENT
      MIRROR
      COLLECT_POST
      COLLECT_COMMENT
      REACTION_POST
      REACTION_COMMENT
    }
    
    # The paginated timeline result
    type PaginatedTimelineResult {
      items: [Publication!]!
      pageInfo: PaginatedResultInfo!
    }
    
    input FeedHighlightsRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # The profile id
      profileId: ProfileId!
    
      # The App Id
      sources: [Sources!] = []
      metadata: PublicationMetadataFilters
    }
    
    input TimelineRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # The profile id
      profileId: ProfileId!
    
      # The App Id
      sources: [Sources!] = []
    
      # The timeline types you wish to include, if nothing passed in will bring back all
      timelineTypes: [TimelineType!] = [
        COLLECT_COMMENT
        COLLECT_POST
        COMMENT
        POST
        MIRROR
      ]
      metadata: PublicationMetadataFilters
    }
    
    # Timeline types
    enum TimelineType {
      POST
      COMMENT
      MIRROR
      COLLECT_POST
      COLLECT_COMMENT
    }
    
    # The paginated follow result
    type PendingApproveFollowsResult {
      items: [Profile!]!
      pageInfo: PaginatedResultInfo!
    }
    
    input PendingApprovalFollowsRequest {
      limit: LimitScalar
      cursor: Cursor
    }
    
    # The does follow response
    type DoesFollowResponse {
      # The follower address remember wallets follow profiles
      followerAddress: EthereumAddress!
    
      # The profile id
      profileId: ProfileId!
    
      # If the user does follow
      follows: Boolean!
    
      # Is finalised on-chain
      isFinalisedOnChain: Boolean!
    }
    
    input DoesFollowRequest {
      # The follower infos
      followInfos: [DoesFollow!]!
    }
    
    input DoesFollow {
      # The follower address remember wallets follow profiles
      followerAddress: EthereumAddress!
    
      # The profile id
      profileId: ProfileId!
    }
    
    type PaginatedFollowingResult {
      items: [Following!]!
      pageInfo: PaginatedResultInfo!
    }
    
    type Following {
      profile: Profile!
      totalAmountOfTimesFollowing: Int!
    }
    
    input FollowingRequest {
      limit: LimitScalar
      cursor: Cursor
      address: EthereumAddress!
    }
    
    # The paginated followers result
    type PaginatedFollowersResult {
      items: [Follower!]!
      pageInfo: PaginatedResultInfo!
    }
    
    type Follower {
      wallet: Wallet!
      totalAmountOfTimesFollowed: Int!
    }
    
    input FollowersRequest {
      limit: LimitScalar
      cursor: Cursor
      profileId: ProfileId!
    }
    
    type FollowerNftOwnedTokenIds {
      followerNftAddress: ContractAddress!
      tokensIds: [String!]!
    }
    
    input FollowerNftOwnedTokenIdsRequest {
      address: EthereumAddress!
      profileId: ProfileId!
    }
    
    # The paginated profile result
    type PaginatedProfileResult {
      items: [Profile!]!
      pageInfo: PaginatedResultInfo!
    }
    
    input MutualFollowersProfilesQueryRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # The profile id your viewing
      viewingProfileId: ProfileId!
    
      # The profile id you want the result to come back as your viewing from
      yourProfileId: ProfileId!
    }
    
    union TransactionResult = TransactionIndexedResult | TransactionError
    
    type TransactionIndexedResult {
      indexed: Boolean!
      txHash: TxHash!
      txReceipt: TransactionReceipt
    
      # Publications can be indexed but the ipfs link for example not findable for x time. This allows you to work that out for publications. If its not a publication tx then it always be null.
      metadataStatus: PublicationMetadataStatus
    }
    
    type TransactionReceipt {
      to: EthereumAddress
      from: EthereumAddress!
      contractAddress: ContractAddress
      transactionIndex: Int!
      root: String
      gasUsed: String!
      logsBloom: String!
      blockHash: String!
      transactionHash: TxHash!
      logs: [Log!]!
      blockNumber: Int!
      confirmations: Int!
      cumulativeGasUsed: String!
      effectiveGasPrice: String!
      byzantium: Boolean!
      type: Int!
      status: Int
    }
    
    type Log {
      blockNumber: Int!
      blockHash: String!
      transactionIndex: Int!
      removed: Boolean!
      address: ContractAddress!
      data: String!
      topics: [String!]!
      transactionHash: TxHash!
      logIndex: Int!
    }
    
    type PublicationMetadataStatus {
      status: PublicationMetadataStatusType!
    
      # If metadata validation failed it will put a reason why here
      reason: String
    }
    
    # publication metadata status type
    enum PublicationMetadataStatusType {
      NOT_FOUND
      PENDING
      METADATA_VALIDATION_FAILED
      SUCCESS
    }
    
    type TransactionError {
      reason: TransactionErrorReasons!
      txReceipt: TransactionReceipt
    }
    
    # Transaction error reason
    enum TransactionErrorReasons {
      REVERTED
    }
    
    input HasTxHashBeenIndexedRequest {
      # Tx hash.. if your using the broadcaster you should use txId due to gas price upgrades
      txHash: TxHash
    
      # Tx id.. if your using the broadcaster you should always use this field
      txId: TxId
    }
    
    type ApprovedAllowanceAmount {
      currency: ContractAddress!
      module: String!
      contractAddress: ContractAddress!
      allowance: String!
    }
    
    input ApprovedModuleAllowanceAmountRequest {
      # The contract addresses for the module approved currencies you want to find information on about the user
      currencies: [ContractAddress!]!
      collectModules: [CollectModules!] = []
      unknownCollectModules: [ContractAddress!] = []
      followModules: [FollowModules!] = []
      unknownFollowModules: [ContractAddress!] = []
      referenceModules: [ReferenceModules!] = []
      unknownReferenceModules: [ContractAddress!] = []
    }
    
    type GenerateModuleCurrencyApproval {
      to: ContractAddress!
      from: EthereumAddress!
      data: BlockchainData!
    }
    
    # Blockchain data scalar type
    scalar BlockchainData
    
    input GenerateModuleCurrencyApprovalDataRequest {
      currency: ContractAddress!
    
      # Floating point number as string (e.g. 42.009837). The server will move its decimal places for you
      value: String!
      collectModule: CollectModules
      unknownCollectModule: ContractAddress
      followModule: FollowModules
      unknownFollowModule: ContractAddress
      referenceModule: ReferenceModules
      unknownReferenceModule: ContractAddress
    }
    
    input ProfileFollowModuleBeenRedeemedRequest {
      followProfileId: ProfileId!
      redeemingProfileId: ProfileId!
    }
    
    # The enabled modules
    type EnabledModules {
      collectModules: [EnabledModule!]!
      followModules: [EnabledModule!]!
      referenceModules: [EnabledModule!]!
    }
    
    type EnabledModule {
      moduleName: String!
      contractAddress: ContractAddress!
      inputParams: [ModuleInfo!]!
      redeemParams: [ModuleInfo!]!
      returnDataParms: [ModuleInfo!]!
    }
    
    type ModuleInfo {
      name: String!
      type: String!
    }
    
    # Paginated nft results
    type NFTsResult {
      items: [NFT!]!
      pageInfo: PaginatedResultInfo!
    }
    
    # The nft type
    type NFT {
      # aka us CryptoKitties
      contractName: String!
    
      # aka 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
      contractAddress: ContractAddress!
    
      # aka RARI
      symbol: String!
    
      # aka "13"
      tokenId: String!
    
      # aka { address: 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e, amount:"2" }
      owners: [Owner!]!
    
      # aka "Beard Coffee"
      name: String!
    
      # aka "Hey cutie! I m Beard Coffee. ....
      description: String!
    
      # aka "https://api.criptokitt..."
      contentURI: String!
    
      # aka "{ uri:"https://ipfs....", metaType:"image/png" }"
      originalContent: NFTContent!
    
      # aka "1"
      chainId: ChainId!
    
      # aka "CryptoKitties"
      collectionName: String!
    
      # aka "ERC721"
      ercType: String!
    }
    
    # The nft type
    type Owner {
      # number of tokens owner
      amount: Float!
    
      # aka 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
      address: EthereumAddress!
    }
    
    # The NFT content uri
    type NFTContent {
      # The token uri  nft
      uri: String!
    
      # The meta type content
      metaType: String!
    
      # The animated url
      animatedUrl: String
    }
    
    input NFTsRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # Filter by owner address
      ownerAddress: EthereumAddress!
    
      # Filter by contract address
      contractAddress: ContractAddress
    
      # Chain Ids
      chainIds: [ChainId!]!
    }
    
    # NFT ownership challenge result
    type NftOwnershipChallengeResult {
      # Id of the nft ownership challenge
      id: NftOwnershipId!
      text: String!
    
      # Timeout of the validation
      timeout: TimestampScalar!
    }
    
    # Nft ownership id type
    scalar NftOwnershipId
    
    input NftOwnershipChallengeRequest {
      # The wallet address which owns the NFT
      ethereumAddress: EthereumAddress!
      nfts: [NftOwnershipChallenge!]!
    }
    
    input NftOwnershipChallenge {
      # ContractAddress for nft
      contractAddress: ContractAddress!
    
      # Token id for NFT
      tokenId: String!
    
      # Chain Id
      chainId: ChainId!
    }
    
    # The paginated notification result
    type PaginatedNotificationResult {
      items: [Notification!]!
      pageInfo: PaginatedResultInfo!
    }
    
    union Notification =
        NewFollowerNotification
      | NewCollectNotification
      | NewCommentNotification
      | NewMirrorNotification
      | NewMentionNotification
      | NewReactionNotification
    
    type NewFollowerNotification {
      notificationId: NotificationId!
      createdAt: DateTime!
      wallet: Wallet!
      isFollowedByMe: Boolean!
    }
    
    # The notification id
    scalar NotificationId
    
    type NewCollectNotification {
      notificationId: NotificationId!
      createdAt: DateTime!
      wallet: Wallet!
      collectedPublication: Publication!
    }
    
    type NewCommentNotification {
      notificationId: NotificationId!
      createdAt: DateTime!
    
      # The profile
      profile: Profile!
      comment: Comment!
    }
    
    type NewMirrorNotification {
      notificationId: NotificationId!
      createdAt: DateTime!
    
      # The profile
      profile: Profile!
      publication: MirrorablePublication!
    }
    
    type NewMentionNotification {
      notificationId: NotificationId!
      createdAt: DateTime!
      mentionPublication: MentionPublication!
    }
    
    union MentionPublication = Post | Comment
    
    type NewReactionNotification {
      notificationId: NotificationId!
      createdAt: DateTime!
    
      # The profile
      profile: Profile!
      reaction: ReactionTypes!
      publication: Publication!
    }
    
    input NotificationRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # The profile id
      profileId: ProfileId!
    
      # The profile id
      notificationTypes: [NotificationTypes!] = [
        MIRRORED_POST
        MIRRORED_COMMENT
        MENTION_POST
        MENTION_COMMENT
        COMMENTED_COMMENT
        COMMENTED_POST
        COLLECTED_POST
        COLLECTED_COMMENT
        FOLLOWED
        REACTION_POST
        REACTION_COMMENT
      ]
    
      # The App Id
      sources: [Sources!] = []
      metadata: PublicationMetadataFilters
      customFilters: [CustomFiltersTypes!] = []
    }
    
    # The notification filter types
    enum NotificationTypes {
      MIRRORED_POST
      MIRRORED_COMMENT
      MENTION_POST
      MENTION_COMMENT
      COMMENTED_COMMENT
      COMMENTED_POST
      COLLECTED_POST
      COLLECTED_COMMENT
      FOLLOWED
      REACTION_POST
      REACTION_COMMENT
    }
    
    input ProfileQueryRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # The profile ids
      profileIds: [ProfileId!]
    
      # The ethereum addresses
      ownedBy: [EthereumAddress!]
    
      # The handles for the profile
      handles: [Handle!]
    
      # The mirrored publication id
      whoMirroredPublicationId: InternalPublicationId
    }
    
    input SingleProfileQueryRequest {
      # The profile id
      profileId: ProfileId
    
      # The handle for the profile
      handle: Handle
    }
    
    input RecommendedProfileOptions {
      # If you wish to turn ML off
      disableML: Boolean = false
    
      # If you wish to shuffle the results
      shuffle: Boolean = false
    }
    
    input DefaultProfileRequest {
      ethereumAddress: EthereumAddress!
    }
    
    type GlobalProtocolStats {
      totalProfiles: Int!
      totalBurntProfiles: Int!
      totalPosts: Int!
      totalMirrors: Int!
      totalComments: Int!
      totalCollects: Int!
      totalFollows: Int!
      totalRevenue: [Erc20Amount!]!
    }
    
    type Erc20Amount {
      # The erc20 token info
      asset: Erc20!
    
      # Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal.
      value: String!
    }
    
    input GlobalProtocolStatsRequest {
      # Unix time from timestamp - if not supplied it will go from 0 timestamp
      fromTimestamp: UnixTimestamp
    
      # Unix time to timestamp - if not supplied it go to the present timestamp
      toTimestamp: UnixTimestamp
    
      # The App Id
      sources: [Sources!]
    }
    
    # UnixTimestamp custom scalar type
    scalar UnixTimestamp
    
    # The paginated publication result
    type PaginatedPublicationResult {
      items: [Publication!]!
      pageInfo: PaginatedResultInfo!
    }
    
    input PublicationsQueryRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # Profile id
      profileId: ProfileId
    
      # Profile ids
      profileIds: [ProfileId!]
    
      # The publication types you want to query
      publicationTypes: [PublicationTypes!]
    
      # The publication id you wish to get comments for
      commentsOf: InternalPublicationId
    
      # The App Id
      sources: [Sources!] = []
    
      # The ethereum address
      collectedBy: EthereumAddress
    
      # The publication id
      publicationIds: [InternalPublicationId!]
      metadata: PublicationMetadataFilters
      customFilters: [CustomFiltersTypes!] = []
    }
    
    input PublicationQueryRequest {
      # The publication id
      publicationId: InternalPublicationId
    
      # The tx hash
      txHash: TxHash
    }
    
    # The paginated wallet result
    type PaginatedWhoCollectedResult {
      items: [Wallet!]!
      pageInfo: PaginatedResultInfo!
    }
    
    input WhoCollectedPublicationRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # Internal publication id
      publicationId: InternalPublicationId!
    }
    
    # The paginated wallet result
    type PaginatedProfilePublicationsForSaleResult {
      items: [PublicationForSale!]!
      pageInfo: PaginatedResultInfo!
    }
    
    union PublicationForSale = Post | Comment
    
    input ProfilePublicationsForSaleRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # Profile id
      profileId: ProfileId!
    
      # The App Id
      sources: [Sources!] = []
      metadata: PublicationMetadataFilters
    }
    
    # The paginated wallet result
    type PaginatedAllPublicationsTagsResult {
      items: [TagResult!]!
      pageInfo: PaginatedResultInfo!
    }
    
    # The social comment
    type TagResult {
      # The tag
      tag: PublicationTag!
    
      # The total amount of publication tagged
      total: Int!
    }
    
    # The publication tag
    scalar PublicationTag
    
    input AllPublicationsTagsRequest {
      limit: LimitScalar
      cursor: Cursor
      sort: TagSortCriteria!
    
      # The App Id
      source: Sources
    }
    
    # The publications tags sort criteria
    enum TagSortCriteria {
      MOST_POPULAR
      ALPHABETICAL
    }
    
    union SearchResult = PublicationSearchResult | ProfileSearchResult
    
    # Publication search results
    type PublicationSearchResult {
      items: [PublicationSearchResultItem!]!
      pageInfo: PaginatedResultInfo!
      type: SearchRequestTypes!
    }
    
    union PublicationSearchResultItem = Post | Comment
    
    # Search request types
    enum SearchRequestTypes {
      PUBLICATION
      PROFILE
    }
    
    # Profile search results
    type ProfileSearchResult {
      items: [Profile!]!
      pageInfo: PaginatedResultInfo!
      type: SearchRequestTypes!
    }
    
    input SearchQueryRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # The search term
      query: Search!
      type: SearchRequestTypes!
      customFilters: [CustomFiltersTypes!] = []
    
      # The App Id
      sources: [Sources!] = []
    }
    
    # Query search
    scalar Search
    
    type UserSigNonces {
      lensHubOnChainSigNonce: Nonce!
      peripheryOnChainSigNonce: Nonce!
    }
    
    # Nonce custom scalar type
    scalar Nonce
    
    type ClaimableHandles {
      reservedHandles: [ReservedClaimableHandle!]!
      canClaimFreeTextHandle: Boolean!
    }
    
    type ReservedClaimableHandle {
      id: HandleClaimIdScalar!
      handle: Handle!
      source: String!
      expiry: DateTime!
    }
    
    # handle claim id custom scalar type
    scalar HandleClaimIdScalar
    
    # The claim status
    enum ClaimStatus {
      ALREADY_CLAIMED
      CLAIM_FAILED
      NOT_CLAIMED
    }
    
    input InternalPublicationsFilterRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # must be DD/MM/YYYY
      fromDate: String!
    
      # must be DD/MM/YYYY
      toDate: String!
    
      # The App Id
      source: Sources!
    
      # The shared secret
      secret: String!
    }
    
    input ProfileOnChainIdentityRequest {
      profileIds: [ProfileId!]!
    }
    
    union ProxyActionStatusResultUnion =
        ProxyActionStatusResult
      | ProxyActionError
      | ProxyActionQueued
    
    type ProxyActionStatusResult {
      txHash: TxHash!
      txId: TxId!
      status: ProxyActionStatusTypes!
    }
    
    # The proxy action status
    enum ProxyActionStatusTypes {
      MINTING
      TRANSFERRING
      COMPLETE
    }
    
    type ProxyActionError {
      reason: String!
      lastKnownTxId: TxId
    }
    
    type ProxyActionQueued {
      queuedAt: DateTime!
    }
    
    # proxy action scalar id type
    scalar ProxyActionId
    
    type PublicationValidateMetadataResult {
      valid: Boolean!
    
      # If valid is false it will put a reason why here
      reason: String
    }
    
    input ValidatePublicationMetadataRequest {
      metadatav1: PublicationMetadataV1Input
      metadatav2: PublicationMetadataV2Input
    }
    
    input PublicationMetadataV1Input {
      # The metadata version. (1.0.0 | 2.0.0)
      version: String!
    
      # The metadata id can be anything but if your uploading to ipfs you will want it to be random.. using uuid could be an option!
      metadata_id: String!
    
      #  This is the appId the content belongs to
      appId: Sources
    
      # A human-readable description of the item.
      description: Markdown
    
      # The content of a publication. If this is blank media must be defined or its out of spec
      content: Markdown
    
      # This is the URL that will appear below the asset's image on OpenSea and others etc
      #       and will allow users to leave OpenSea and view the item on the site.
      external_url: Url
    
      # Signed metadata to validate the owner
      signatureContext: PublicationSignatureContextInput
    
      # Name of the item.
      name: String!
    
      #  These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item.
      attributes: [MetadataAttributeInput!]!
    
      # legacy to support OpenSea will store any NFT image here.
      image: Url
    
      # This is the mime type of the image. This is used if your uploading more advanced cover images as sometimes ipfs does not emit the content header so this solves that
      imageMimeType: MimeType
    
      #  This is lens supported attached media items to the publication
      media: [PublicationMetadataMediaInput!]
    
      # A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV,
      #       and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
      #       Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
      #       WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.
      animation_url: Url
    }
    
    input PublicationSignatureContextInput {
      signature: String!
    }
    
    # The metadata attribute input
    input MetadataAttributeInput {
      # The display type
      displayType: PublicationMetadataDisplayTypes
    
      # The trait type - can be anything its the name it will render so include spaces
      traitType: String!
    
      # The value
      value: String!
    }
    
    # The metadata attribute input
    input PublicationMetadataMediaInput {
      item: Url!
    
      # This is the mime type of media
      type: MimeType
    
      # The alt tags for accessibility
      altTag: String
    
      # The cover for any video or audio you attached
      cover: Url
      source: PublicationMediaSource = LENS
    }
    
    # The source of the media
    enum PublicationMediaSource {
      LENS
    }
    
    input PublicationMetadataV2Input {
      # The metadata version. (1.0.0 | 2.0.0)
      version: String!
    
      # The metadata id can be anything but if your uploading to ipfs you will want it to be random.. using uuid could be an option!
      metadata_id: String!
    
      #  This is the appId the content belongs to
      appId: Sources
    
      # A human-readable description of the item.
      description: Markdown
    
      # The content of a publication. If this is blank media must be defined or its out of spec
      content: Markdown
    
      # This is the URL that will appear below the asset's image on OpenSea and others etc
      #       and will allow users to leave OpenSea and view the item on the site.
      external_url: Url
    
      # Signed metadata to validate the owner
      signatureContext: PublicationSignatureContextInput
    
      # Name of the item.
      name: String!
    
      #  These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item.
      attributes: [MetadataAttributeInput!]!
    
      # legacy to support OpenSea will store any NFT image here.
      image: Url
    
      # This is the mime type of the image. This is used if your uploading more advanced cover images as sometimes ipfs does not emit the content header so this solves that
      imageMimeType: MimeType
    
      #  This is lens supported attached media items to the publication
      media: [PublicationMetadataMediaInput!]
    
      # A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV,
      #       and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
      #       Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
      #       WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.
      animation_url: Url
    
      # IOS 639-1 language code aka en or it and ISO 3166-1 alpha-2 region code aka US or IT aka en-US or it-IT
      locale: Locale!
    
      # Ability to tag your publication
      tags: [String!]
    
      # Ability to add a content warning
      contentWarning: PublicationContentWarning
    
      # Main content focus that for this publication
      mainContentFocus: PublicationMainFocus!
    }
    
    input GetPublicationMetadataStatusRequest {
      publicationId: InternalPublicationId
      txHash: TxHash
      txId: TxId
    }
    
    type PaginatedWhoReactedResult {
      items: [WhoReactedResult!]!
      pageInfo: PaginatedResultInfo!
    }
    
    # The Profile
    type WhoReactedResult {
      # The reaction id
      reactionId: ReactionId!
    
      # The reaction
      reaction: ReactionTypes!
    
      # The reaction
      reactionAt: DateTime!
      profile: Profile!
    }
    
    # The reaction id
    scalar ReactionId
    
    input WhoReactedPublicationRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # Internal publication id
      publicationId: InternalPublicationId!
    }
    
    # The paginated revenue result
    type ProfilePublicationRevenueResult {
      items: [PublicationRevenue!]!
      pageInfo: PaginatedResultInfo!
    }
    
    # The social comment
    type PublicationRevenue {
      publication: Publication!
      revenue: RevenueAggregate!
    }
    
    type RevenueAggregate {
      total: Erc20Amount!
    }
    
    input ProfilePublicationRevenueQueryRequest {
      limit: LimitScalar
      cursor: Cursor
    
      # The profile id
      profileId: ProfileId!
    
      # The App Id
      sources: [Sources!] = []
    
      # The revenue types
      types: [PublicationTypes!] = [COMMENT, MIRROR, POST]
      metadata: PublicationMetadataFilters
    }
    
    input PublicationRevenueQueryRequest {
      # The publication id
      publicationId: InternalPublicationId!
    }
    
    type FollowRevenueResult {
      revenues: [RevenueAggregate!]!
    }
    
    input ProfileFollowRevenueQueryRequest {
      # The profile id
      profileId: ProfileId!
    }
    
    # Represents NULL values
    scalar Void
    
    input RelRequest {
      secret: String!
      ethereumAddress: EthereumAddress!
    }
    
    input CurRequest {
      secret: String!
    }
    
    type Mutation {
      authenticate(request: SignedAuthChallenge!): AuthenticationResult!
      refresh(request: RefreshRequest!): AuthenticationResult!
      broadcast(request: BroadcastRequest!): RelayResult!
      createSetDispatcherTypedData(
        options: TypedDataOptions
        request: SetDispatcherRequest!
      ): CreateSetDispatcherBroadcastItemResult!
      createFollowTypedData(
        options: TypedDataOptions
        request: FollowRequest!
      ): CreateFollowBroadcastItemResult!
      createUnfollowTypedData(
        options: TypedDataOptions
        request: UnfollowRequest!
      ): CreateUnfollowBroadcastItemResult!
      createSetFollowModuleTypedData(
        options: TypedDataOptions
        request: CreateSetFollowModuleRequest!
      ): CreateSetFollowModuleBroadcastItemResult!
      createSetFollowNFTUriTypedData(
        options: TypedDataOptions
        request: CreateSetFollowNFTUriRequest!
      ): CreateSetFollowNFTUriBroadcastItemResult!
      createToggleFollowTypedData(
        options: TypedDataOptions
        request: CreateToggleFollowRequest!
      ): CreateToggleFollowBroadcastItemResult!
      createAttachMediaData(request: PublicMediaRequest!): PublicMediaResults!
      createCollectTypedData(
        options: TypedDataOptions
        request: CreateCollectRequest!
      ): CreateCollectBroadcastItemResult!
      createSetDefaultProfileTypedData(
        options: TypedDataOptions
        request: CreateSetDefaultProfileRequest!
      ): SetDefaultProfileBroadcastItemResult!
      createSetProfileImageURITypedData(
        options: TypedDataOptions
        request: UpdateProfileImageRequest!
      ): CreateSetProfileImageUriBroadcastItemResult!
      createSetProfileImageURIViaDispatcher(
        request: UpdateProfileImageRequest!
      ): RelayResult!
      createBurnProfileTypedData(
        options: TypedDataOptions
        request: BurnProfileRequest!
      ): CreateBurnProfileBroadcastItemResult!
      createPostTypedData(
        options: TypedDataOptions
        request: CreatePublicPostRequest!
      ): CreatePostBroadcastItemResult!
      createPostViaDispatcher(request: CreatePublicPostRequest!): RelayResult!
      createCommentTypedData(
        options: TypedDataOptions
        request: CreatePublicCommentRequest!
      ): CreateCommentBroadcastItemResult!
      createCommentViaDispatcher(request: CreatePublicCommentRequest!): RelayResult!
      createMirrorTypedData(
        options: TypedDataOptions
        request: CreateMirrorRequest!
      ): CreateMirrorBroadcastItemResult!
      hidePublication(request: HidePublicationRequest!): Void
      createMirrorViaDispatcher(request: CreateMirrorRequest!): RelayResult!
      claim(request: ClaimHandleRequest!): RelayResult!
      idKitPhoneVerifyWebhook(
        request: IdKitPhoneVerifyWebhookRequest!
      ): IdKitPhoneVerifyWebhookResultStatusType!
    
      # Adds profile interests to the given profile
      addProfileInterests(request: AddProfileInterestsRequest!): Void
    
      # Removes profile interests from the given profile
      removeProfileInterests(request: RemoveProfileInterestsRequest!): Void
      createSetProfileMetadataTypedData(
        options: TypedDataOptions
        request: CreatePublicSetProfileMetadataURIRequest!
      ): CreateSetProfileMetadataURIBroadcastItemResult!
      createSetProfileMetadataViaDispatcher(
        request: CreatePublicSetProfileMetadataURIRequest!
      ): RelayResult!
      proxyAction(request: ProxyActionRequest!): ProxyActionId!
      addReaction(request: ReactionRequest!): Void
      removeReaction(request: ReactionRequest!): Void
      reportPublication(request: ReportPublicationRequest!): Void
      ach(request: AchRequest!): Void
      hel(request: HelRequest!): Void
    }
    
    # The authentication result
    type AuthenticationResult {
      # The access token
      accessToken: Jwt!
    
      # The refresh token
      refreshToken: Jwt!
    }
    
    # The signed auth challenge
    input SignedAuthChallenge {
      # The ethereum address you signed the signature with
      address: EthereumAddress!
    
      # The signature
      signature: Signature!
    }
    
    # Relayer signature
    scalar Signature
    
    # The refresh request
    input RefreshRequest {
      # The refresh token
      refreshToken: Jwt!
    }
    
    union RelayResult = RelayerResult | RelayError
    
    # The relayer result
    type RelayerResult {
      # The tx hash - you should use the txId as your identifier as gas prices can be upgraded meaning txHash will change
      txHash: TxHash!
    
      # The tx id
      txId: TxId!
    }
    
    type RelayError {
      reason: RelayErrorReasons!
    }
    
    # Relay error reason
    enum RelayErrorReasons {
      REJECTED
      HANDLE_TAKEN
      EXPIRED
      WRONG_WALLET_SIGNED
      NOT_ALLOWED
    }
    
    input BroadcastRequest {
      id: BroadcastId!
      signature: Signature!
    }
    
    # Broadcast scalar id type
    scalar BroadcastId
    
    # The broadcast item
    type CreateSetDispatcherBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateSetDispatcherEIP712TypedData!
    }
    
    # The set dispatcher eip 712 typed data
    type CreateSetDispatcherEIP712TypedData {
      # The types
      types: CreateSetDispatcherEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreateSetDispatcherEIP712TypedDataValue!
    }
    
    # The set dispatcher eip 712 typed data types
    type CreateSetDispatcherEIP712TypedDataTypes {
      SetDispatcherWithSig: [EIP712TypedDataField!]!
    }
    
    # The eip 712 typed data field
    type EIP712TypedDataField {
      # The name of the typed data field
      name: String!
    
      # The type of the typed data field
      type: String!
    }
    
    # The eip 712 typed data domain
    type EIP712TypedDataDomain {
      # The name of the typed data domain
      name: String!
    
      # The chainId
      chainId: ChainId!
    
      # The version
      version: String!
    
      # The verifying contract
      verifyingContract: ContractAddress!
    }
    
    # The set dispatcher eip 712 typed data value
    type CreateSetDispatcherEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      profileId: ProfileId!
      dispatcher: EthereumAddress!
    }
    
    input TypedDataOptions {
      # If you wish to override the nonce for the sig if you want to do some clever stuff in the client
      overrideSigNonce: Nonce!
    }
    
    input SetDispatcherRequest {
      # The profile id
      profileId: ProfileId!
    
      # The dispatcher address - they can post, comment, mirror, set follow module, change your profile picture on your behalf, if left as none it will use the built in dispatcher address.
      dispatcher: EthereumAddress
    
      # If you want to enable or disable it
      enable: Boolean
    }
    
    # The broadcast item
    type CreateFollowBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateFollowEIP712TypedData!
    }
    
    # The create follow eip 712 typed data
    type CreateFollowEIP712TypedData {
      # The types
      types: CreateFollowEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreateFollowEIP712TypedDataValue!
    }
    
    # The create follow eip 712 typed data types
    type CreateFollowEIP712TypedDataTypes {
      FollowWithSig: [EIP712TypedDataField!]!
    }
    
    # The create follow eip 712 typed data value
    type CreateFollowEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      profileIds: [ProfileId!]!
      datas: [BlockchainData!]!
    }
    
    input FollowRequest {
      follow: [Follow!]!
    }
    
    input Follow {
      profile: ProfileId!
      followModule: FollowModuleRedeemParams
    }
    
    input FollowModuleRedeemParams {
      # The follower fee follower module
      feeFollowModule: FeeFollowModuleRedeemParams
    
      # The profile follower module
      profileFollowModule: ProfileFollowModuleRedeemParams
    
      # A unknown follow module
      unknownFollowModule: UnknownFollowModuleRedeemParams
    }
    
    input FeeFollowModuleRedeemParams {
      # The expected amount to pay
      amount: ModuleFeeAmountParams!
    }
    
    input ModuleFeeAmountParams {
      # The currency address
      currency: ContractAddress!
    
      # Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal.
      value: String!
    }
    
    input ProfileFollowModuleRedeemParams {
      # The profile id to use to follow this profile
      profileId: ProfileId!
    }
    
    input UnknownFollowModuleRedeemParams {
      # The encoded data to submit with the module
      data: BlockchainData!
    }
    
    # The broadcast item
    type CreateUnfollowBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateBurnEIP712TypedData!
    }
    
    # The create burn eip 712 typed data
    type CreateBurnEIP712TypedData {
      # The types
      types: CreateBurnEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreateBurnEIP712TypedDataValue!
    }
    
    # The create burn eip 712 typed data types
    type CreateBurnEIP712TypedDataTypes {
      BurnWithSig: [EIP712TypedDataField!]!
    }
    
    # The create burn eip 712 typed data value
    type CreateBurnEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      tokenId: String!
    }
    
    input UnfollowRequest {
      profile: ProfileId!
    }
    
    # The broadcast item
    type CreateSetFollowModuleBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateSetFollowModuleEIP712TypedData!
    }
    
    # The set follow module eip 712 typed data
    type CreateSetFollowModuleEIP712TypedData {
      # The types
      types: CreateSetFollowModuleEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreateSetFollowModuleEIP712TypedDataValue!
    }
    
    # The set follow module eip 712 typed data types
    type CreateSetFollowModuleEIP712TypedDataTypes {
      SetFollowModuleWithSig: [EIP712TypedDataField!]!
    }
    
    # The set follow module eip 712 typed data value
    type CreateSetFollowModuleEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      profileId: ProfileId!
      followModule: ContractAddress!
      followModuleInitData: FollowModuleData!
    }
    
    input CreateSetFollowModuleRequest {
      profileId: ProfileId!
    
      # The follow module info
      followModule: FollowModuleParams!
    }
    
    input FollowModuleParams {
      # The follower fee follower module
      feeFollowModule: FeeFollowModuleParams
    
      # The profile follow module
      profileFollowModule: Boolean
    
      # The revert follow module
      revertFollowModule: Boolean
    
      # The empty follow module
      freeFollowModule: Boolean
    
      # A unknown follow module
      unknownFollowModule: UnknownFollowModuleParams
    }
    
    input FeeFollowModuleParams {
      # The follow module amount info
      amount: ModuleFeeAmountParams!
    
      # The follow module recipient address
      recipient: EthereumAddress!
    }
    
    input UnknownFollowModuleParams {
      contractAddress: ContractAddress!
    
      # The encoded data to submit with the module
      data: BlockchainData!
    }
    
    # The broadcast item
    type CreateSetFollowNFTUriBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateSetFollowNFTUriEIP712TypedData!
    }
    
    # The set follow nft uri eip 712 typed data
    type CreateSetFollowNFTUriEIP712TypedData {
      # The types
      types: CreateSetFollowNFTUriEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreateSetFollowNFTUriEIP712TypedDataValue!
    }
    
    # The set follow nft uri eip 712 typed data types
    type CreateSetFollowNFTUriEIP712TypedDataTypes {
      SetFollowNFTURIWithSig: [EIP712TypedDataField!]!
    }
    
    # The set follow nft uri eip 712 typed data value
    type CreateSetFollowNFTUriEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      profileId: ProfileId!
      followNFTURI: Url!
    }
    
    input CreateSetFollowNFTUriRequest {
      profileId: ProfileId!
    
      # The follow NFT URI is the NFT metadata your followers will mint when they follow you. This can be updated at all times. If you do not pass in anything it will create a super cool changing NFT which will show the last publication of your profile as the NFT which looks awesome! This means people do not have to worry about writing this logic but still have the ability to customise it for their followers
      followNFTURI: Url
    }
    
    # The broadcast item
    type CreateToggleFollowBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateToggleFollowEIP712TypedData!
    }
    
    # The create toggle follows eip 712 typed data
    type CreateToggleFollowEIP712TypedData {
      # The types
      types: CreateToggleFollowEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreateToggleFollowEIP712TypedDataValue!
    }
    
    # The create toggle follows eip 712 typed data types
    type CreateToggleFollowEIP712TypedDataTypes {
      ToggleFollowWithSig: [EIP712TypedDataField!]!
    }
    
    # The create toggle follow eip 712 typed data value
    type CreateToggleFollowEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      profileIds: [ProfileId!]!
      enables: [Boolean!]!
    }
    
    input CreateToggleFollowRequest {
      profileIds: [ProfileId!]!
      enables: [Boolean!]!
    }
    
    # The response to upload the attached file
    type PublicMediaResults {
      # Signed url to push the file
      signedUrl: String!
    
      # ipfs uri to add on the metadata
      media: MediaOutput!
    }
    
    # Media object output
    type MediaOutput {
      item: Url!
    
      # This is the mime type of media
      type: MimeType
    
      # The alt tags for accessibility
      altTag: String
    
      # The cover for any video or audio you attached
      cover: Url
      source: PublicationMediaSource
    }
    
    input PublicMediaRequest {
      # Pre calculated cid of the file to push
      itemCid: IfpsCid!
    
      # This is the mime type of media
      type: MimeType
    
      # The alt tags for accessibility
      altTag: String
    
      # The cover for any video or audio you attached
      cover: Url
    }
    
    # IfpsCid scalar type
    scalar IfpsCid
    
    # The broadcast item
    type CreateCollectBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateCollectEIP712TypedData!
    }
    
    # The collect eip 712 typed data
    type CreateCollectEIP712TypedData {
      # The types
      types: CreateCollectEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreateCollectEIP712TypedDataValue!
    }
    
    # The collect eip 712 typed data types
    type CreateCollectEIP712TypedDataTypes {
      CollectWithSig: [EIP712TypedDataField!]!
    }
    
    # The collect eip 712 typed data value
    type CreateCollectEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      profileId: ProfileId!
      pubId: PublicationId!
      data: BlockchainData!
    }
    
    # Publication id custom scalar type
    scalar PublicationId
    
    input CreateCollectRequest {
      publicationId: InternalPublicationId!
    
      # The encoded data to collect with if using an unknown module
      unknownModuleData: BlockchainData
    }
    
    # The broadcast item
    type SetDefaultProfileBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: SetDefaultProfileEIP712TypedData!
    }
    
    # The default profile eip 712 typed data
    type SetDefaultProfileEIP712TypedData {
      # The types
      types: SetDefaultProfileEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: SetDefaultProfileEIP712TypedDataValue!
    }
    
    # The default profile eip 712 typed data types
    type SetDefaultProfileEIP712TypedDataTypes {
      SetDefaultProfileWithSig: [EIP712TypedDataField!]!
    }
    
    # The default profile eip 712 typed data value
    type SetDefaultProfileEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      wallet: EthereumAddress!
      profileId: ProfileId!
    }
    
    input CreateSetDefaultProfileRequest {
      # Profile id
      profileId: ProfileId!
    }
    
    # The broadcast item
    type CreateSetProfileImageUriBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateSetProfileImageUriEIP712TypedData!
    }
    
    # The set profile uri eip 712 typed data
    type CreateSetProfileImageUriEIP712TypedData {
      # The types
      types: CreateSetProfileImageUriEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreateSetProfileImageUriEIP712TypedDataValue!
    }
    
    # The set profile image uri eip 712 typed data types
    type CreateSetProfileImageUriEIP712TypedDataTypes {
      SetProfileImageURIWithSig: [EIP712TypedDataField!]!
    }
    
    # The set profile uri eip 712 typed data value
    type CreateSetProfileImageUriEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      profileId: ProfileId!
      imageURI: Url!
    }
    
    input UpdateProfileImageRequest {
      profileId: ProfileId!
    
      # The url to the image if offline
      url: Url
    
      # The nft data
      nftData: NFTData
    }
    
    input NFTData {
      # Id of the nft ownership challenge
      id: NftOwnershipId!
    
      # The signature
      signature: Signature!
    }
    
    # The broadcast item
    type CreateBurnProfileBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateBurnEIP712TypedData!
    }
    
    input BurnProfileRequest {
      profileId: ProfileId!
    }
    
    # The broadcast item
    type CreatePostBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreatePostEIP712TypedData!
    }
    
    # The create post eip 712 typed data
    type CreatePostEIP712TypedData {
      # The types
      types: CreatePostEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreatePostEIP712TypedDataValue!
    }
    
    # The create post eip 712 typed data types
    type CreatePostEIP712TypedDataTypes {
      PostWithSig: [EIP712TypedDataField!]!
    }
    
    # The create post eip 712 typed data value
    type CreatePostEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      profileId: ProfileId!
      contentURI: PublicationUrl!
      collectModule: ContractAddress!
      collectModuleInitData: CollectModuleData!
      referenceModule: ContractAddress!
      referenceModuleInitData: ReferenceModuleData!
    }
    
    # Publication url scalar type
    scalar PublicationUrl
    
    input CreatePublicPostRequest {
      # Profile id
      profileId: ProfileId!
    
      # The metadata uploaded somewhere passing in the url to reach it
      contentURI: Url!
    
      # The collect module
      collectModule: CollectModuleParams!
    
      # The reference module
      referenceModule: ReferenceModuleParams
    
      # The criteria to access the publication data
      gated: GatedPublicationParamsInput
    }
    
    input CollectModuleParams {
      # The collect empty collect module
      freeCollectModule: FreeCollectModuleParams
    
      # The collect revert collect module
      revertCollectModule: Boolean
    
      # The collect fee collect module
      feeCollectModule: FeeCollectModuleParams
    
      # The collect limited fee collect module
      limitedFeeCollectModule: LimitedFeeCollectModuleParams
    
      # The collect limited timed fee collect module
      limitedTimedFeeCollectModule: LimitedTimedFeeCollectModuleParams
    
      # The collect timed fee collect module
      timedFeeCollectModule: TimedFeeCollectModuleParams
    
      # A unknown collect module
      unknownCollectModule: UnknownCollectModuleParams
    }
    
    input FreeCollectModuleParams {
      # Follower only
      followerOnly: Boolean!
    }
    
    input FeeCollectModuleParams {
      # The collect module amount info
      amount: ModuleFeeAmountParams!
    
      # The collect module recipient address
      recipient: EthereumAddress!
    
      # The collect module referral fee
      referralFee: Float!
    
      # Follower only
      followerOnly: Boolean!
    }
    
    input LimitedFeeCollectModuleParams {
      # The collect module limit
      collectLimit: String!
    
      # The collect module amount info
      amount: ModuleFeeAmountParams!
    
      # The collect module recipient address
      recipient: EthereumAddress!
    
      # The collect module referral fee
      referralFee: Float!
    
      # Follower only
      followerOnly: Boolean!
    }
    
    input LimitedTimedFeeCollectModuleParams {
      # The collect module limit
      collectLimit: String!
    
      # The collect module amount info
      amount: ModuleFeeAmountParams!
    
      # The collect module recipient address
      recipient: EthereumAddress!
    
      # The collect module referral fee
      referralFee: Float!
    
      # Follower only
      followerOnly: Boolean!
    }
    
    input TimedFeeCollectModuleParams {
      # The collect module amount info
      amount: ModuleFeeAmountParams!
    
      # The collect module recipient address
      recipient: EthereumAddress!
    
      # The collect module referral fee
      referralFee: Float!
    
      # Follower only
      followerOnly: Boolean!
    }
    
    input UnknownCollectModuleParams {
      contractAddress: ContractAddress!
    
      # The encoded data to submit with the module
      data: BlockchainData!
    }
    
    input ReferenceModuleParams {
      # The follower only reference module
      followerOnlyReferenceModule: Boolean
    
      # A unknown reference module
      unknownReferenceModule: UnknownReferenceModuleParams
    
      # The degrees of seperation reference module
      degreesOfSeparationReferenceModule: DegreesOfSeparationReferenceModuleParams
    }
    
    input UnknownReferenceModuleParams {
      contractAddress: ContractAddress!
    
      # The encoded data to submit with the module
      data: BlockchainData!
    }
    
    input DegreesOfSeparationReferenceModuleParams {
      # Applied to comments
      commentsRestricted: Boolean!
    
      # Applied to mirrors
      mirrorsRestricted: Boolean!
    
      # Degrees of separation
      degreesOfSeparation: Int!
    }
    
    # The access conditions for the publication
    input GatedPublicationParamsInput {
      # NFT ownership condition
      nft: NftOwnershipInput
    
      # ERC20 token ownership condition
      token: Erc20OwnershipInput
    
      # EOA ownership condition
      eoa: EoaOwnershipInput
    
      # Profile ownership condition
      profile: ProfileOwnershipInput
    
      # Profile follow condition
      follow: FollowConditionInput
    
      # Profile follow condition
      collect: CollectConditionInput
    
      # AND condition
      and: AndConditionInput
    
      # OR condition
      or: OrConditionInput
    
      # The LIT Protocol encrypted symmetric key
      encryptedSymmetricKey: ContentEncryptionKey!
    }
    
    input NftOwnershipInput {
      # The NFT collection's ethereum address
      contractAddress: ContractAddress!
    
      # The NFT chain id
      chainID: ChainId!
    
      # The unlocker contract type
      contractType: ContractType!
    
      # The optional token ID(s) to check for ownership
      tokenIds: [TokenId!] = []
    }
    
    input Erc20OwnershipInput {
      # The ERC20 token's ethereum address
      contractAddress: ContractAddress!
    
      # The amount of tokens required to access the content
      chainID: ChainId!
    
      # The amount of tokens required to access the content
      amount: String!
    
      # The amount of decimals of the ERC20 contract
      decimals: Float!
    
      # The operator to use when comparing the amount of tokens
      condition: ScalarOperator!
    }
    
    input EoaOwnershipInput {
      # The address that will have access to the content
      address: EthereumAddress!
    }
    
    # Condition that signifies if address has access to profile
    input ProfileOwnershipInput {
      # The profile id
      profileId: ProfileId!
    }
    
    input FollowConditionInput {
      # The profile id of the gated profile
      profileId: ProfileId!
    }
    
    # Condition that signifies if address or profile has collected a publication
    input CollectConditionInput {
      # The publication id that has to be collected to unlock content
      publicationId: InternalPublicationId
    
      # True if the content will be unlocked for this specific publication
      thisPublication: Boolean
    }
    
    input AndConditionInput {
      # The list of conditions to apply AND to. You can only use nested boolean conditions at the root level.
      criteria: [AccessConditionInput!]!
    }
    
    # The access conditions for the publication
    input AccessConditionInput {
      # NFT ownership condition
      nft: NftOwnershipInput
    
      # ERC20 token ownership condition
      token: Erc20OwnershipInput
    
      # EOA ownership condition
      eoa: EoaOwnershipInput
    
      # Profile ownership condition
      profile: ProfileOwnershipInput
    
      # Profile follow condition
      follow: FollowConditionInput
    
      # Profile follow condition
      collect: CollectConditionInput
    
      # AND condition
      and: AndConditionInput
    
      # OR condition
      or: OrConditionInput
    }
    
    input OrConditionInput {
      # The list of conditions to apply OR to. You can only use nested boolean conditions at the root level.
      criteria: [AccessConditionInput!]!
    }
    
    # The broadcast item
    type CreateCommentBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateCommentEIP712TypedData!
    }
    
    # The create comment eip 712 typed data
    type CreateCommentEIP712TypedData {
      # The types
      types: CreateCommentEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreateCommentEIP712TypedDataValue!
    }
    
    # The create comment eip 712 typed data types
    type CreateCommentEIP712TypedDataTypes {
      CommentWithSig: [EIP712TypedDataField!]!
    }
    
    # The create comment eip 712 typed data value
    type CreateCommentEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      profileId: ProfileId!
      contentURI: PublicationUrl!
      profileIdPointed: ProfileId!
      pubIdPointed: PublicationId!
      collectModule: ContractAddress!
      collectModuleInitData: CollectModuleData!
      referenceModule: ContractAddress!
      referenceModuleInitData: ReferenceModuleData!
      referenceModuleData: ReferenceModuleData!
    }
    
    input CreatePublicCommentRequest {
      # Profile id
      profileId: ProfileId!
    
      # Publication id of what your comments on remember if this is a comment you commented on it will be that as the id
      publicationId: InternalPublicationId!
    
      # The metadata uploaded somewhere passing in the url to reach it
      contentURI: Url!
    
      # The collect module
      collectModule: CollectModuleParams!
    
      # The reference module
      referenceModule: ReferenceModuleParams
    
      # The criteria to access the publication data
      gated: GatedPublicationParamsInput
    }
    
    # The broadcast item
    type CreateMirrorBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateMirrorEIP712TypedData!
    }
    
    # The mirror eip 712 typed data
    type CreateMirrorEIP712TypedData {
      # The types
      types: CreateMirrorEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreateMirrorEIP712TypedDataValue!
    }
    
    # The mirror eip 712 typed data types
    type CreateMirrorEIP712TypedDataTypes {
      MirrorWithSig: [EIP712TypedDataField!]!
    }
    
    # The mirror eip 712 typed data value
    type CreateMirrorEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      profileId: ProfileId!
      profileIdPointed: ProfileId!
      pubIdPointed: PublicationId!
      referenceModuleData: ReferenceModuleData!
      referenceModule: ContractAddress!
      referenceModuleInitData: ReferenceModuleData!
    }
    
    input CreateMirrorRequest {
      # Profile id
      profileId: ProfileId!
    
      # Publication id of what you want to mirror on remember if this is a comment it will be that as the id
      publicationId: InternalPublicationId!
    
      # The reference module info
      referenceModule: ReferenceModuleParams
    }
    
    input HidePublicationRequest {
      # Publication id
      publicationId: InternalPublicationId!
    }
    
    input ClaimHandleRequest {
      id: HandleClaimIdScalar
      freeTextHandle: CreateHandle
    
      # The follow module
      followModule: FollowModuleParams
    }
    
    # create handle custom scalar type
    scalar CreateHandle
    
    # The verify webhook result status type
    enum IdKitPhoneVerifyWebhookResultStatusType {
      SUCCESS
      ALREADY_VERIFIED
    }
    
    input IdKitPhoneVerifyWebhookRequest {
      sharedSecret: String!
      worldcoin: WorldcoinPhoneVerifyWebhookRequest
    }
    
    input WorldcoinPhoneVerifyWebhookRequest {
      nullifierHash: String!
      signalType: WorldcoinPhoneVerifyType!
      signal: EthereumAddress!
    }
    
    # The worldcoin signal type
    enum WorldcoinPhoneVerifyType {
      PHONE
      ORB
    }
    
    # The request object to add interests to a profile
    input AddProfileInterestsRequest {
      # The profile interest to add
      interests: [ProfileInterest!]!
    
      # The profileId to add interests to
      profileId: ProfileId!
    }
    
    # The request object to remove interests from a profile
    input RemoveProfileInterestsRequest {
      # The profile interest to add
      interests: [ProfileInterest!]!
    
      # The profileId to add interests to
      profileId: ProfileId!
    }
    
    # The broadcast item
    type CreateSetProfileMetadataURIBroadcastItemResult {
      # This broadcast item ID
      id: BroadcastId!
    
      # The date the broadcast item expiries
      expiresAt: DateTime!
    
      # The typed data
      typedData: CreateSetProfileMetadataURIEIP712TypedData!
    }
    
    # The set follow nft uri eip 712 typed data
    type CreateSetProfileMetadataURIEIP712TypedData {
      # The types
      types: CreateSetProfileMetadataURIEIP712TypedDataTypes!
    
      # The typed data domain
      domain: EIP712TypedDataDomain!
    
      # The values
      value: CreateSetProfileMetadataURIEIP712TypedDataValue!
    }
    
    # The set follow nft uri eip 712 typed data types
    type CreateSetProfileMetadataURIEIP712TypedDataTypes {
      SetProfileMetadataURIWithSig: [EIP712TypedDataField!]!
    }
    
    # The set follow nft uri eip 712 typed data value
    type CreateSetProfileMetadataURIEIP712TypedDataValue {
      nonce: Nonce!
      deadline: UnixTimestamp!
      profileId: ProfileId!
      metadata: Url!
    }
    
    input CreatePublicSetProfileMetadataURIRequest {
      # Profile id
      profileId: ProfileId!
    
      # The metadata uploaded somewhere passing in the url to reach it
      metadata: Url!
    }
    
    input ProxyActionRequest {
      follow: FollowProxyAction
      collect: CollectProxyAction
    }
    
    input FollowProxyAction {
      freeFollow: FreeFollowProxyAction
    }
    
    input FreeFollowProxyAction {
      profileId: ProfileId!
    }
    
    input CollectProxyAction {
      freeCollect: FreeCollectProxyAction
    }
    
    input FreeCollectProxyAction {
      publicationId: InternalPublicationId!
    }
    
    input ReactionRequest {
      # Profile id to perform the action
      profileId: ProfileId!
    
      # The reaction
      reaction: ReactionTypes!
    
      # The internal publication id
      publicationId: InternalPublicationId!
    }
    
    input ReportPublicationRequest {
      publicationId: InternalPublicationId!
      reason: ReportingReasonInputParams!
      additionalComments: String
    }
    
    input ReportingReasonInputParams {
      sensitiveReason: SensitiveReasonInputParams
      illegalReason: IllegalReasonInputParams
      fraudReason: FraudReasonInputParams
      spamReason: SpamReasonInputParams
    }
    
    input SensitiveReasonInputParams {
      reason: PublicationReportingReason!
      subreason: PublicationReportingSensitiveSubreason!
    }
    
    # Publication reporting reason
    enum PublicationReportingReason {
      SENSITIVE
      ILLEGAL
      FRAUD
      SPAM
    }
    
    # Publication reporting sensitive subreason
    enum PublicationReportingSensitiveSubreason {
      NSFW
      OFFENSIVE
    }
    
    input IllegalReasonInputParams {
      reason: PublicationReportingReason!
      subreason: PublicationReportingIllegalSubreason!
    }
    
    # Publication reporting illegal subreason
    enum PublicationReportingIllegalSubreason {
      ANIMAL_ABUSE
      HUMAN_ABUSE
      VIOLENCE
      THREAT_INDIVIDUAL
      DIRECT_THREAT
    }
    
    input FraudReasonInputParams {
      reason: PublicationReportingReason!
      subreason: PublicationReportingFraudSubreason!
    }
    
    # Publication reporting fraud subreason
    enum PublicationReportingFraudSubreason {
      SCAM
      IMPERSONATION
    }
    
    input SpamReasonInputParams {
      reason: PublicationReportingReason!
      subreason: PublicationReportingSpamSubreason!
    }
    
    # Publication reporting spam subreason
    enum PublicationReportingSpamSubreason {
      MISLEADING
      MISUSE_HASHTAGS
      UNRELATED
      REPETITIVE
      FAKE_ENGAGEMENT
      MANIPULATION_ALGO
      SOMETHING_ELSE
    }
    
    input AchRequest {
      secret: String!
      ethereumAddress: EthereumAddress!
      handle: CreateHandle
      freeTextHandle: Boolean
      overrideTradeMark: Boolean!
      overrideAlreadyClaimed: Boolean!
    }
    
    input HelRequest {
      secret: String!
      handle: Handle!
      remove: Boolean!
    }
    `;
  }
}

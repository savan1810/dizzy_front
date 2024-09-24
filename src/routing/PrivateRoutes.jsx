import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from '../pages/Main/Main'
import AddSection from '../pages/Main/AddSection'
import VideoMessage from '../pages/Main/AddSection/VideoMessage/VideoMessage'
import AddMusic from '../pages/Main/AddSection/Music/AddMusic'
import SearchForRelease from '../pages/Main/AddSection/Music/SearchForRelease/SearchForRelease'
import MusicPlatformPage from '../pages/Main/AddSection/Music/MusicPlatformPage'
import ManualEntry from '../pages/Main/AddSection/Music/Manual/ManualEntry'
import AddLink from '../pages/Main/AddSection/Music/Manual/AddLink'
import CustomPage from '../pages/Main/AddSection/Music/Custom/CustomPage'
import AddEvent from '../pages/Main/AddSection/Event/AddEvent'
import BlukImportEvent from '../pages/Main/AddSection/Event/BulkImport/BlukImportEvent'
import ImportSingleEvent from '../pages/Main/AddSection/Event/SingleImport/ImportSingleEvent'
import ImportLink from '../pages/Main/AddSection/Event/SingleImport/ImportLink'
import CustomEvent from '../pages/Main/AddSection/Event/CustomEvent/CustomEvent'
import DatePickerPage from '../pages/Main/AddSection/Event/DatePickerPage'
import AddProduct from '../pages/Main/AddSection/Product/AddProduct'
import ImportProduct from '../pages/Main/AddSection/Product/ImportProduct/ImportProduct'
import ImportLinkProduct from '../pages/Main/AddSection/Product/ImportProduct/ImportLinkProduct'
import ManuallyAddProduct from '../pages/Main/AddSection/Product/CustomProduct/ManuallyAddProduct'
import AddForm from '../pages/Main/AddSection/Form/AddForm'
import AddFormLink from '../pages/Main/AddSection/Form/Form/AddFormLink'
import AddPoll from '../pages/Main/AddSection/Form/Form/AddPoll'
import AddLinkSocialFeed from '../pages/Main/AddSection/SocialFeed/Social/AddLinkSocialFeed'
import SelectVideoPlatform from '../pages/Main/AddSection/Video/SelectVideoPlatform'
import AddLinkVideo from '../pages/Main/AddSection/Video/AddLinkVideo'
import PlaylistPlatform from '../pages/Main/AddSection/Playlist/PlaylistPlatform'
import PlaylistLink from '../pages/Main/AddSection/Playlist/PlaylistLink'
import AddSocialFed from '../pages/Main/AddSection/SocialFeed/AddSocialFed'
import AddCustomlink from '../pages/Main/AddSection/Customlink/AddCustomlink'
import ExistingSection from '../pages/Main/AddSection/Customlink/ExistingSection'
import CreateNewSection from '../pages/Main/AddSection/Customlink/CreateNewSection'
import { SocialEdit } from '../components/Main/ArticleEdit/SocialEdit'
import Selectpage from '../pages/Focuspage/Selectpage'
import SelectType from '../pages/Focuspage/Type/SelectType'
import SelectMusicType from '../pages/Focuspage/Type/Music/SelectMusicType'
import Step1 from '../pages/Focuspage/Type/Music/Form/Step1'
import Step2 from '../pages/Focuspage/Type/Music/Form/Step2'
import Step3 from '../pages/Focuspage/Type/Music/Form/Step3'
import Step4 from '../pages/Focuspage/Type/Music/Form/Step4'
import Step5 from '../pages/Focuspage/Type/Music/Form/Step5'
import Step6 from '../pages/Focuspage/Type/Music/Form/Step6'
import Step7 from '../pages/Focuspage/Type/Music/Form/Step7'
import MusicPage from '../pages/Focuspage/Type/Music/MusicPage'
import SelectProductType from '../pages/Focuspage/Type/Product/SelectProductType'
import ProductStep1 from '../pages/Focuspage/Type/Product/Form/Step1'
import ProductStep2 from '../pages/Focuspage/Type/Product/Form/Step2'
import ProductStep3 from '../pages/Focuspage/Type/Product/Form/Step3'
import ProductStep4 from '../pages/Focuspage/Type/Product/Form/Step4'
import ProductStep5 from '../pages/Focuspage/Type/Product/Form/Step5'
import ProductStep6 from '../pages/Focuspage/Type/Product/Form/Step6'
import ProductStep7 from '../pages/Focuspage/Type/Product/Form/Step7'
import SelectEventType from '../pages/Focuspage/Type/Event/SelectEventType'
import EventStep1 from '../pages/Focuspage/Type/Event/Form/Step1'
import EventStep2 from '../pages/Focuspage/Type/Event/Form/Step2'
import EventStep3 from '../pages/Focuspage/Type/Event/Form/Step3'
import EventStep4 from '../pages/Focuspage/Type/Event/Form/Step4'
import EventStep5 from '../pages/Focuspage/Type/Event/Form/Step5'
import EventStep6 from '../pages/Focuspage/Type/Event/Form/Step6'
import DatePickerFocus from '../pages/Focuspage/Type/Event/DatePicker'

import NewsletterStep1 from '../pages/Focuspage/Type/Newsletter/Form/Step1'
import NewsletterStep2 from '../pages/Focuspage/Type/Newsletter/Form/Step2'
import NewsletterStep3 from '../pages/Focuspage/Type/Newsletter/Form/Step3'
import NewsletterStep4 from '../pages/Focuspage/Type/Newsletter/Form/Step4'
import NewsletterStep5 from '../pages/Focuspage/Type/Newsletter/Form/Step5'
import NewsletterStep6 from '../pages/Focuspage/Type/Newsletter/Form/Step6'
import SelectNewsletterType from '../pages/Focuspage/Type/Newsletter/SelectNewsletterType'
import ProductPage from '../pages/Focuspage/Type/Product/ProductPage'
import EventPage from '../pages/Focuspage/Type/Event/EventPage'
import NewsletterPage from '../pages/Focuspage/Type/Newsletter/NewsletterPage'
import Step8 from '../pages/Focuspage/Type/Music/Form/Step8'
import Step9 from '../pages/Focuspage/Type/Music/Form/Step9'
import MultipleMusicPage from '../pages/Focuspage/Type/Music/MultipleMusicPage'
import MultipleProductPage from '../pages/Focuspage/Type/Product/MultipleProductPage'
import MultipleNewsletterPage from '../pages/Focuspage/Type/Newsletter/MultipleNewsletterPage'
import MultipleEventPage from '../pages/Focuspage/Type/Event/MultipleEventPage'
import SelectOption from '../pages/More/SelectOption'
import SettingOption from '../pages/More/Setting/SettingOption'
import Profile from '../pages/More/Setting/Profile/Profile'
import ProfilePhoneEdit from '../pages/More/Setting/Profile/ProfilePhoneEdit'
import OldPhone from '../pages/More/Setting/Profile/Phone/OldPhone'
import VerifyOldPhone from '../pages/More/Setting/Profile/Phone/VerifyOldPhone'
import NewPhone from '../pages/More/Setting/Profile/Phone/NewPhone'
import VerifyNewPhone from '../pages/More/Setting/Profile/Phone/VerifyNewPhone'
import DelegateAccess from '../pages/More/Setting/Profile/DelegateAccess/DelegateAccess'
import Subscription from '../pages/More/Setting/Subscription/Subscription'
import PaymentSuccess from '../pages/More/Setting/Subscription/PaymentSuccess'
import PaymentFailed from '../pages/More/Setting/Subscription/PaymentFailed'
import Analytics from '../pages/More/Analytics/Analytics'
import VideoMessageAnalytics from '../pages/More/Analytics/VideoMessage/VideoMessage'
import Music from '../components/Main/Music'
import MusicAnalytics from '../pages/More/Analytics/Music/MusicAnalytics'
import VideoAnalytics from '../pages/More/Analytics/Video/VideoAnalytics'
import EventAnalytics from '../pages/More/Analytics/Event/EventAnalytics'
import ProductAnalytics from '../pages/More/Analytics/Product/ProductAnalytics'
import Domain from '../pages/Domain/Domain'
import Filter from '../pages/More/Analytics/VideoMessage/Filter'
import SocialFeedAnalytics from '../pages/More/Analytics/SocialFeed/SocialfeedAnalytics'
import PlaylistAnalytics from '../pages/More/Analytics/Playlist/PlaylistAnalytics'
import MusicPlatformData from '../pages/More/Analytics/Music/MusicPlatformData'
import FormAnalytics from '../pages/More/Analytics/Form/FormAnalytics'
import FormsAnalytics from '../pages/More/Analytics/Form/Forms/FormsAnaltytics'
import PollsAnalytics from '../pages/More/Analytics/Form/Polls/PollsAnalytics'
import MusicDataPage from '../pages/Main/Pages/Music/MusicDataPage'
import PlaylistDataPage from '../pages/Main/Pages/Playlist/PlaylistDataPage'
import Follower from '../pages/Domain/Follower'
import Following from '../pages/Domain/Following'
import ImportBulkProduct from '../pages/Main/AddSection/Product/ImportProduct/ImportBulkProduct'
import ConnectWithShopify from '../pages/Main/AddSection/Product/ImportProduct/ConnectWithShopify'
import { useSelector } from 'react-redux'
import Suggested from '../pages/Personal/Suggested'
import Top from '../pages/Personal/Top'
import Trending from '../pages/Personal/Trending'
import FollowingPersonal from '../pages/Personal/Following'
import Search from '../pages/Personal/Search'


function PrivateRoutes() {
    const userArticle = useSelector((state) => state.user.userArticle);
    const token = localStorage.getItem('dizeeToken');
    console.log('userArticle', userArticle?.professionRole)
    return (

        <Routes >
            {userArticle?.professionRole === "personal" && token &&
                <>
                    <Route path="/" element={<Suggested />} />
                    <Route path="/top" element={<Top />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/following" element={<FollowingPersonal />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/:domain" element={<Domain />} />
                    <Route path="/:domain/:focuspage" element={<Domain />} />
                    <Route path="/follower/:domain" element={<Follower />} />
                    <Route path="/following/:domain" element={<Following />} />

                </>
            }
            {token &&

                <>
                    <Route path="/" element={<Main />} />
                    <Route path="/social-edit" element={<SocialEdit />} />
                    <Route path="/:domain" element={<Domain />} />
                    <Route path="/:domain/:focuspage" element={<Domain />} />
                    <Route path="/follower/:domain" element={<Follower />} />
                    <Route path="/following/:domain" element={<Following />} />


                    <Route path="/music-data/:domain/:id" element={<MusicDataPage />} />
                    <Route path="/playlist-data/:domain" element={<PlaylistDataPage />} />

                    <Route path="/add-section">
                        <Route index element={<AddSection />} />
                        <Route path="video-message" element={<VideoMessage />} />

                        <Route path="add-music" element={<AddMusic />} />
                        <Route path="search-for-release" element={<SearchForRelease />} />
                        <Route path="music-platform" element={<MusicPlatformPage />} />
                        <Route path="music-manual-entry" element={<ManualEntry />} />
                        <Route path="manual-music-link" element={<AddLink />} />
                        <Route path="custom-music-link" element={<CustomPage />} />

                        <Route path="add-video" element={<SelectVideoPlatform />} />
                        <Route path="add-video-link" element={<AddLinkVideo />} />
                        {/* <Route path="import-video" element={<ImportVideo />} /> */}
                        {/* <Route path="custom-video-link" element={<CustomVideo />} /> */}

                        <Route path="add-event" element={<AddEvent />} />
                        <Route path="bulk-import-events" element={<BlukImportEvent />} />
                        <Route path="import-single-event" element={<ImportSingleEvent />} />
                        <Route path="single-import-link" element={<ImportLink />} />
                        <Route path="custom-event-link" element={<CustomEvent />} />
                        <Route path="date-picker" element={<DatePickerPage />} />
                        {/* <Route path="add-video" element={<AddEvent />} /> */}

                        <Route path="add-product" element={<AddProduct />} />
                        {/* <Route path="import-product" element={<ImportProduct />} /> */}
                        <Route path="import-product" element={<ImportBulkProduct />} />
                        <Route path="connect-with-shopify" element={<ConnectWithShopify />} />
                        <Route path="product-import-link" element={<ImportLinkProduct />} />
                        <Route path="manually-add-product" element={<ManuallyAddProduct />} />

                        <Route path="add-playlist" element={<PlaylistPlatform />} />
                        <Route path="add-playlist-link" element={<PlaylistLink />} />

                        <Route path="add-form" element={<AddForm />} />
                        <Route path="add-form-link" element={<AddFormLink />} />
                        <Route path="add-poll" element={<AddPoll />} />

                        <Route path="add-social-feed" element={<AddSocialFed />} />
                        <Route path="add-social-feed-link" element={<AddLinkSocialFeed />} />

                        <Route path="add-custom-link" element={<AddCustomlink />} />
                        <Route path="select-section" element={<ExistingSection />} />
                        <Route path="create-section" element={<CreateNewSection />} />

                    </Route>
                    <Route path="/focus-page">
                        <Route index element={<Selectpage />} />
                        <Route path="focus-type" element={<SelectType />} />

                        {/* music  */}
                        <Route path="music-page" element={<MusicPage />} />
                        <Route path="multiple-music-page" element={<MultipleMusicPage />} />
                        <Route path="music-type">
                            <Route index element={<SelectMusicType />} />
                            <Route path="step1" element={<Step1 />} />
                            <Route path="step2" element={<Step2 />} />
                            <Route path="step3" element={<Step3 />} />
                            <Route path="step4" element={<Step4 />} />
                            <Route path="step5" element={<Step5 />} />
                            <Route path="step6" element={<Step6 />} />
                            <Route path="step7" element={<Step7 />} />
                            <Route path="step8" element={<Step8 />} />
                            <Route path="step9" element={<Step9 />} />
                        </Route>


                        {/* product  */}
                        <Route path="product-page" element={<ProductPage />} />
                        <Route path="multiple-product-page" element={<MultipleProductPage />} />
                        <Route path="product-type">
                            <Route index element={<SelectProductType />} />
                            <Route path="step1" element={<ProductStep1 />} />
                            <Route path="step2" element={<ProductStep2 />} />
                            <Route path="step3" element={<ProductStep3 />} />
                            <Route path="step4" element={<ProductStep4 />} />
                            <Route path="step5" element={<ProductStep5 />} />
                            <Route path="step6" element={<ProductStep6 />} />
                            <Route path="step7" element={<ProductStep7 />} />
                        </Route>
                        {/* event  */}
                        <Route path="event-page" element={<EventPage />} />
                        <Route path="multiple-event-page" element={<MultipleEventPage />} />
                        <Route path="event-type">
                            <Route index element={<SelectEventType />} />
                            <Route path="step1" element={<EventStep1 />} />
                            <Route path="step2" element={<EventStep2 />} />
                            <Route path="step3" element={<EventStep3 />} />
                            <Route path="step4" element={<EventStep4 />} />
                            <Route path="step5" element={<EventStep5 />} />
                            <Route path="step6" element={<EventStep6 />} />
                            <Route path="date-picker" element={<DatePickerFocus />} />
                        </Route>
                        {/* event  */}
                        <Route path="newsletter-page" element={<NewsletterPage />} />
                        <Route path="multiple-newsletter-page" element={<MultipleNewsletterPage />} />
                        <Route path="newsletter-type">
                            <Route index element={<SelectNewsletterType />} />
                            <Route path="step1" element={<NewsletterStep1 />} />
                            <Route path="step2" element={<NewsletterStep2 />} />
                            <Route path="step3" element={<NewsletterStep3 />} />
                            <Route path="step4" element={<NewsletterStep4 />} />
                            <Route path="step5" element={<NewsletterStep5 />} />
                            <Route path="step6" element={<NewsletterStep6 />} />
                            <Route path="date-picker" element={<DatePickerFocus />} />
                        </Route>
                    </Route>

                    <Route path='more'>
                        <Route index element={<SelectOption />} />

                        <Route path="setting">
                            <Route index element={<SettingOption />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="profile-edit" element={<ProfilePhoneEdit />} />
                            <Route path="old-phone" element={<OldPhone />} />
                            <Route path="verify-old-phone" element={<VerifyOldPhone />} />
                            <Route path="new-phone" element={<NewPhone />} />
                            <Route path="verify-new-phone" element={<VerifyNewPhone />} />

                            <Route path="subscription" element={<Subscription />} />
                            <Route path="payement-success" element={<PaymentSuccess />} />
                            <Route path="payement-failed" element={<PaymentFailed />} />

                            <Route path="delegate-access" element={<DelegateAccess />} />
                        </Route>

                        <Route path="analytics">
                            <Route index element={<Analytics />} />
                            <Route path="video-message" element={<VideoMessageAnalytics />} />
                            <Route path="music" element={<MusicAnalytics />} />
                            <Route path="music/:title" element={<MusicPlatformData />} />

                            <Route path="video" element={<VideoAnalytics />} />
                            <Route path="event" element={<EventAnalytics />} />
                            <Route path="product" element={<ProductAnalytics />} />
                            <Route path="playlist" element={<PlaylistAnalytics />} />
                            <Route path="socialfeed" element={<SocialFeedAnalytics />} />
                            <Route path="form" element={<FormAnalytics />} />
                            <Route path="forms" element={<FormsAnalytics />} />
                            <Route path="polls" element={<PollsAnalytics />} />


                            <Route path="filter" element={<Filter />} />

                            {/* <Route path="profile" element={<Profile />} />
                    <Route path="old-phone" element={<OldPhone />} />
                    <Route path="verify-old-phone" element={<VerifyOldPhone />} />
                    <Route path="new-phone" element={<NewPhone />} />
                    <Route path="verify-new-phone" element={<VerifyNewPhone />} />

                    <Route path="subscription" element={<Subscription />} />
                    <Route path="payement-success" element={<PaymentSuccess />} />
                    <Route path="payement-failed" element={<PaymentFailed />} />

                    <Route path="delegate-access" element={<DelegateAccess />} /> */}
                        </Route>
                    </Route>
                </>
            }

        </Routes>
    )
}

export default PrivateRoutes

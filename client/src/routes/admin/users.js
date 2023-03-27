import TagList from '@progress/kendo-react-dropdowns/dist/npm/MultiSelect/TagList';
import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
const page_path = '../../container/pages/';

const AddPost = lazy(() => import('../../container/pages/AddPost'));
const EditPost = lazy(() => import('../../container/pages/EditPost'));
const ViewPost = lazy(() => import('../../container/pages/ViewPost'));

const AddPins = lazy(() => import('../../container/pages/AddPins'));
const DefaultImage = lazy(() => import('../../container/pages/DefaultImage'));
const DefaultLink = lazy(() => import('../../container/pages/DefaultLink'));
const EditPins = lazy(() => import('../../container/pages/EditPins'));
const ViewPins = lazy(() => import('../../container/pages/ViewPins'));

const AddUser = lazy(() => import('../../container/pages/AddUsers'));
const EditUser = lazy(() => import('../../container/pages/EditUsers'));
const ViewUser = lazy(() => import('../../container/pages/ViewUsers'));
const UsersList = lazy(() => import('../../container/pages/UsersList'));
const Payments = lazy(() => import('../../container/pages/Payments'));
const Subscriptions = lazy(() => import('../../container/pages/Subscriptions'));
const Plans = lazy(() => import('../../container/pages/Plans'));

const SectionList = lazy(() => import('../../container/pages/SectionList'));
const SkillList = lazy(() => import('../../container/pages/SkillList'));
const TopicList = lazy(() => import('../../container/pages/TopicList'));
const UserGroup = lazy(() => import('../../container/pages/UserGroup'));
const CategoryList = lazy(() => import('../../container/pages/CategoryList'));
const SubCategory = lazy(() => import('../../container/pages/SubCategory'));
const TagsList = lazy(() => import('../../container/pages/TagsList'));

const QuizzesList = lazy(() => import('../../container/pages/QuizzesList'));
// const ExamList = lazy(() => import('../../container/pages/ExamList'));
const QuestionList = lazy(() => import('../../container/pages/QuestionList'));

// const Board = lazy(() => import('../../components/PinterestBoard/TrelloApp'));
// const NewBoard = lazy(() => import('../../ComponentsTrello/BoardApp'));
// const Schedule = lazy(() => import('../../components/Schedules/TrelloApp'));
const Pin = lazy(() => import('../../container/pages/Pin'));

const CustomerList = lazy(() => import('../../container/pages/CustomerList'));
const AddCustomer = lazy(() => import('../../container/pages/AddCustomer'));
const ViewCustomer = lazy(() => import('../../container/pages/ViewCustomer'));
const EditCustomer = lazy(() => import('../../container/pages/EditCustomer'));

const ChatGpt = lazy(() => import('../../container/pages/ChatGpt'));
const Configuration = lazy(() => import('../../container/pages/Configuration'));
const FormUI = lazy(() => import('../../container/pages/FormUI'));

const SocialAccounts = lazy(() => import('../../container/pages/SocialAccounts'));

const PagesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      {/* 1 */}
      <Route path={`${path}/add-post`} component={AddPost} />
      <Route path={`${path}/edit-post/:id`} component={EditPost} />
      <Route path={`${path}/view-post/:id`} component={ViewPost} />

      <Route path={`${path}/default-image`} component={DefaultImage} />
      <Route path={`${path}/default-link`} component={DefaultLink} />
      <Route path={`${path}/add-pins`} component={AddPins} />
      <Route path={`${path}/edit-pins/:id`} component={EditPins} />
      <Route path={`${path}/view-pins/:id`} component={ViewPins} />

      <Route path={`${path}/add-user`} component={AddUser} />
      <Route path={`${path}/edit-user/:id`} component={EditUser} />
      <Route path={`${path}/view-user/:id`} component={ViewUser} />
      <Route path={`${path}/categorieslist`} component={CategoryList} />
      <Route path={`${path}/sub-category`} component={SubCategory} />
      <Route path={`${path}/tags`} component={TagsList} />
      <Route path={`${path}/users`} component={UsersList} />
      <Route path={`${path}/plans`} component={Plans} />
      <Route path={`${path}/subscriptions`} component={Subscriptions} />
      <Route path={`${path}/payments`} component={Payments} />
      <Route path={`${path}/quizzes`} component={QuizzesList} />
      {/* <Route path={`${path}/exams`} component={ExamList} /> */}
      <Route path={`${path}/question`} component={QuestionList} />

      <Route path={`${path}/add-customer`} component={AddCustomer} />
      <Route path={`${path}/view-customer/:id`} component={ViewCustomer} />
      <Route path={`${path}/edit-customer/:id`} component={EditCustomer} />

      <Route exact path={`${path}/social_accounts`} component={SocialAccounts} />
      {/* <Route exact path={`${path}/Board`} component={Board} />
      <Route exact path={`${path}/NewBoard`} component={NewBoard} /> */}
      <Route exact path={`${path}/Pinterest`} component={Pin} />
      {/* <Route exact path={`${path}/Schedule`} component={Schedule} /> */}

      <Route path={`${path}/chatgpt`} component={ChatGpt} />
      <Route path={`${path}/configuration`} component={Configuration} />
      <Route path={`${path}/form-builder`} component={FormUI} />

      <Route path={`${path}/sectionlist`} component={SectionList} />
      <Route path={`${path}/skill-list`} component={SkillList} />
      <Route path={`${path}/topiclist`} component={TopicList} />
      <Route path={`${path}/usergroup`} component={UserGroup} />

      {/* <Route exact path={`${path}/Board`} component={Board} /> */}
    </Switch>
  );
};
export default PagesRoute;

import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
const AddPins = lazy(() => import('../pages/AddPins'));

import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

const SocialMediaOverview = lazy(() => import('./overview/index/SocialMediaOverview'));

const Dashboard = () => {
  return (
    <>
      <PageHeader
        ghost
        // title="Social Media Dashboard"
        // buttons={[
        //   <div key="6" className="page-header-actions">
        //     <CalendarButtonPageHeader key="1" />
        //     <ExportButtonPageHeader key="2" />
        //     <ShareButtonPageHeader key="3" />
        //     <Button size="small" key="4" type="primary">
        //       <FeatherIcon icon="plus" size={14} />
        //       Add New
        //     </Button>
        //   </div>,
        // ]}
      />
      <Main>
        <Row justify="left" gutter={5}>
          <Col xxl={24} lg={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              {/* <SocialMediaOverview /> */}
              <AddPins />
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Dashboard;

import ProjectsDrawer from './ProjectsDrawer';
import ActivitiesDrawer from './ActivitiesDrawer';
import HypothesisDrawer from './HypothesisDrawer';
import MemberDrawer from './MemberDrawer';
import TestDrawer from './TestDrawer';
import DocumentDrawer from './DocumentDrawer';
import ClientDrawer from './ClientDrawer';
import EventDrawer from './EventDrawer';
import PitchDeckDrawer from './PitchDeckDrawer';
import BusinessModelCanvasDrawer from './BusinessModelCanvasDrawer';
import IdealCustomerProfileDrawer from './IdealCustomerProfileDrawer';
import SWOTDrawer from './SWOTDrawer';
import PlanDrawer from './PlanDrawer';

export default function Drawers() {
  return (
    <>
      <ProjectsDrawer />
      <ActivitiesDrawer />
      <HypothesisDrawer />
      <MemberDrawer />
      <TestDrawer />
      <DocumentDrawer />
      <ClientDrawer />
      <EventDrawer />
      <PitchDeckDrawer />
      <BusinessModelCanvasDrawer />
      <IdealCustomerProfileDrawer />
      <SWOTDrawer />
      <PlanDrawer />
      {/* Aqui você pode adicionar outros drawers no futuro */}
      {/* <UsersDrawer /> */}
    </>
  );
}

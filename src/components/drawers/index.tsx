import ProjectsDrawer from './ProjectsDrawer';
import ActivitiesDrawer from './ActivitiesDrawer';

export default function Drawers() {
  return (
    <>
      <ProjectsDrawer />
      <ActivitiesDrawer />
      {/* Aqui você pode adicionar outros drawers no futuro */}
      {/* <ClientsDrawer /> */}
      {/* <UsersDrawer /> */}
    </>
  );
}

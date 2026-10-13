import {projectsRoute} from "@/pages/projects";
import {Logo} from "@/shared/ui";
import {Link} from "atomic-router-react";

export const Header = () => {
  return (
    <Link to={projectsRoute}>
      <Logo />
    </Link>
  )
}
import {projectsRoute} from "@/pages/projects";
import {Logo} from "@/shared/ui";
import {Link} from "atomic-router-react";

export const LogoLink = () => {
  return (
    <Link to={projectsRoute}>
      <Logo />
    </Link>
  )
}
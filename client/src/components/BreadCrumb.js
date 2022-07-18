import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { NavLink } from 'react-router-dom';

const DynamicUserBreadcrumb = ({ match }) => (
    <span>{match.params.title}</span>
);

const CustomPropsBreadcrumb = ({ someProp }) => (
    <span>{someProp}</span>
);

// define custom breadcrumbs for certain routes.
// breadcumbs can be components or strings.
const routes = [
    { path: '/specializattion/:id', DynamicUserBreadcrumb },
    { path: '/', breadcrumb: 'Trang chủ' },
    { path: '/specialization/:id/:title', breadcrumb: DynamicUserBreadcrumb },
];

// map & render your breadcrumb components however you want.
const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs(routes);
    console.log(breadcrumbs);

    return (
        <>
            {breadcrumbs.map(({
                match,
                breadcrumb
            }) => (
                <span key={match.pathname}>
                    <NavLink to={match.pathname}>{breadcrumb}</NavLink>
                </span>
            ))}
        </>
    );
};

export default Breadcrumbs
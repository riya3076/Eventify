import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let navigate = useNavigate();
        let location = useLocation();
        let params = useParams();
        return (
            <Component
                {...props}
                navigate={navigate}
                location={location}
                params={params}
            />
        );
    }
    return ComponentWithRouterProp;
}

export default withRouter;

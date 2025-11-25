import React from 'react';
import { useOS } from '../context/OSContext';
import AppIcon from './AppIcon';

const HomeScreen = () => {
    const { installedApps, launchApp } = useOS();

    return (
        <div className="grid grid-cols-4 gap-x-4 gap-y-8 mt-8 px-2">
            {installedApps.map((app) => (
                <AppIcon
                    key={app.id}
                    app={app}
                    onClick={() => launchApp(app.id)}
                />
            ))}
        </div>
    );
};

export default HomeScreen;

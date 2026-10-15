import { loadRemoteModule } from '@angular-architects/native-federation';
import { RemoteErrorComponent } from '../components/remote-error/remote-error.component';
import { Route } from '@angular/router';

export function buildRemoteRoute(path: string, remoteName: string, exposedModule: string): Route {
  return {
    path,
    loadChildren: () =>
      loadRemoteModule(remoteName, exposedModule)
        .then((m) => m[Object.keys(m)[0]] || m.default)
        .catch((err) => {
          console.error(
            `[MFE Host] Failed to load remote component ${remoteName}/${exposedModule} -- `,
            err,
          );
          return [{ path: '', component: RemoteErrorComponent, data: { remoteName } }];
        }),
  };
}

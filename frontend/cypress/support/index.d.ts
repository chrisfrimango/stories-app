/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface MountOptions extends Partial<MountReactComponentOptions> {
      initialModalState?: {
        editingProfile?: {
          id: string | number;
          username: string;
          email: string;
          bio: string;
        };
      };
    }
  }
}

export {};

/// <reference types="cypress" />
import { Post } from "../../src/types/postsTypes";
import { UserProfile } from "../../src/types/user";

declare global {
  namespace Cypress {
    interface MountOptions extends Partial<MountReactComponentOptions> {
      initialModalState?: {
        editingPost?: Post;
      };
    }
    interface AUTWindow extends Window {
      initialModalState: {
        editingPost?: Post;
        editingProfile?: UserProfile;
      };
      localStorage: Storage;
    }
  }
}

export {};

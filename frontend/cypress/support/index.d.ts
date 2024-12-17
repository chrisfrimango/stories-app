/// <reference types="cypress" />
import { Post } from "../../src/types/post";
import { UserProfile } from "../../src/types/user";

declare global {
  namespace Cypress {
    interface MountOptions extends Partial<MountReactComponentOptions> {
      initialModalState?: {
        editingPost?: Post;
      };
    }
  }

  interface AUTWindow {
    initialModalState?: {
      editingPost?: Post;
      editingProfile?: UserProfile;
    };
  }
}

export {};

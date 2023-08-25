import { ApplicationStatus } from '$lib/types/application';

export function ParseStatusApplication(status: ApplicationStatus): string {
  switch (status) {
    case ApplicationStatus.ACCEPTED: {
      return 'Accepted';
    }
    case ApplicationStatus.DENIED: {
      return 'Denied';
    }
    default: {
      return 'Pending';
    }
  }
}

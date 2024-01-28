import { signOut } from '../../../auth';
import { Button } from '../ui/button';

const Header = () => {
    return (
        <div>
            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}
            >
                <Button>Logout</Button>
            </form>
        </div>
    );
};

export default Header;

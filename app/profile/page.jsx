import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  const { user } = await getSession();

  return (
      user && (
          <div className="m-10">
            {/* pfp + name */}
            <div className="flex flex-row items-center px-20 py-10">
              
              <div className="bg-gray-100 p-20 mr-4">
                <img className="w-30 rounded" alt="userImg" src={user.picture} />
              </div>
              
              <div className="bg-gray-100 flex flex-col px-20 py-20 m-10">
                <h2 className="mb-4">{user.name}</h2>
                <h2>{user.email}</h2>
              </div>
            
            </div>         
          </div>
      )
  );
}
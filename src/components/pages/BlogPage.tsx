import React from "react";
import "./Blog.css";
import ProfilePage from '../ProfilePage';

interface Props {
  authToken: string;
  onLogout: () => Promise<void>;
}

interface BlogPost {
  title: string;
  content: string;
  date: Date;
}

const testPosts: BlogPost[] = [
  {
    title: "A legnépszerűbb halak a világon",
    content:
      "A legnépszerűbb halak a világon közé tartozik a lazac, a tonhal és a pisztráng. Ezek a halak ízletesek és táplálóak, és rengeteg egészségügyi előnnyel rendelkeznek.",
    date: new Date("2023-03-01"),
  },
  {
    title: "Hogyan lehet a halakat egészségesen elkészíteni?",
    content:
      "Ha egészségesen szeretnéd elkészíteni a halakat, akkor fontos, hogy ne használj túl sok olajat vagy sót. Ajánlott a grillezés vagy a sütés párolóban, és ha lehet, akkor fogyassz hozzá zöldségeket és teljes kiőrlésű gabonákat.",
    date: new Date("2023-02-25"),
  },
  {
    title: "A halak jótékony hatása az egészségre",
    content:
      "A halakban található omega-3 zsírsavak számos egészségügyi előnnyel rendelkeznek, például csökkentik a szívbetegségek, a stroke és a rák kockázatát. Emellett jótékony hatással vannak az agyra és az idegrendszerre, és segíthetnek csökkenteni az ízületi gyulladást és a depressziót.",
    date: new Date("2023-02-20"),
  },
  
];

const BlogPage = (props: Props) => {
  const handleLogout = async () => {
    await props.onLogout();
  }

  return (
    <div>
      <button className="logoutbutton" onClick={handleLogout}>Kijelentkezés</button>
      <ProfilePage authToken={props.authToken} onLogout={props.onLogout} />

      <h2 className="oldal">Blog oldal</h2>
    <div className="blog-page">
      
      <div className="blog-posts">
        {testPosts.map((post, index) => (
          <div key={index} className="blog-post">
            <h2 className="blog-post__title">{post.title}</h2>
            <p className="blog-post__content">{post.content}</p>
            <p className="blog-post__date">{post.date.toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BlogPage;

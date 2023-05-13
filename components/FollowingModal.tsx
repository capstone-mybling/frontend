import { useState } from "react";
import { FileType } from "@prisma/client";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserAvatar from "./UserAvatar";
import { User } from "@prisma/client";

interface UserWithFollow extends User {
  followings: number[];
}

export default function FollowingModal(userFollowing: UserWithFollow[]) {
  const followingList = Object.values(userFollowing);
  console.log("팔로잉목록 = ", followingList[0]);
  console.log("팔로잉하는사람 이름 = ", followingList[0].username);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 12,
    p: 2,
  };
  const handleDeleteFollower = () => {
    console.log("팔로우삭제");
  };

  return (
    <>
      <button onClick={handleModalOpen}>
        <span className="mr-2 font-bold">{followingList[0].length}</span>
        <span className="font-semibold text-gray-400">Followings</span>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex border-b-[2px] border-gray-200 pb-2 justify-between">
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ alignSelf: "center", marginX: "auto" }}
              >
                팔로잉
              </Typography>
              <button onClick={handleModalClose} className="hover:text-red-300">
                X
              </button>
            </div>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {followingList.map((following) => (
                <li key={following.id} className="list-none">
                  <div className="flex justify-between">
                    <UserAvatar
                      size="small"
                      UserImage="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFRUZGRgYGBgYGBgZGBgYGBgcGBgaGhgZGhgcIy4lHCErIRgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHjEhJCE0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDQxND80NDQxNP/AABEIAOAA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xABFEAACAQIDAwcICAQFBAMAAAABAgADEQQSIQUxQQYyUWFxgZETFCJCUpKhsQcjU2JygsHRFRYzVKKywtLhJEOT8DRjg//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAtEQACAQIFAwQBBAMBAAAAAAAAAQIDEQQSITFRE0GRBSJSYRQVMnGBU6HBBv/aAAwDAQACEQMRAD8A6TCEJ0iCEIQAIQhAAhCeHYAEkgAakk2sJJJ7hMrtLloikph0NZtxa+Wmva5390osTtrGVD6VbIPZpqB4udZlKvGO7E5JbnR7QtOVlqh1avVJ6c5/Sekequq4isp/HceBmf5USc6OpQnOsNt/GU/+4lVR6rrlPvr+0vMBy0otZa6tQc7i2tMnqcfrNI1oy7lKSexqYTyjhgGUgg7iCCD3iepqMIQlbtHbmGof1aqKeCg3Y/lGsG0gLKEyeJ5bJupYeo/WQEHi0j/zpU/tfGoszdWK7izI2kLzHUeW1j9ZhnUcSjK/wGsvNlbfw+IuKTgsN6N6Lj8p1lRmpbDuWsIWhNCghCEACEIQAIQhAAhCEACEIQAIQkfHYtKSNUqEKiC5J6B0dfRJJGtq7Rp4emalRrKOHrMeCgcSZz7au0auKN3JSkOZRHHrqEbz93dG8bjXxNTy1UEAH6qn9mp424uRv6IThrV3+1GU5dkeVUAWGg4dAnu0SLOFmQl4XhPJdekeIjsB6nl1BFiNOIihx0jxEWNXQ9g2diquGbNh3svrUXuUb8PsHrGk0y8uKGQEo/ltxoAXa/Tm3BPvTMyJjkK2qKLlN49pDzl/UTohiJLRmkZss9obYxOIuHfySH1KZOa33qm/wkOjhkTmqAeLb2PaTqZ7RwwDDcQCOsGLMp1JyerJcmwMSLEkECxqth1Y5tVcc11OVl6wRHYsFNxd0NNrY0vJflCzsMPiD9Zb0H3CqOI6nHRxmsE5TiaeYCxyspDIw3q6m6kfr1TofJ7annNBKm5tVcdDrow8de+elQrZlZm8ZXRZwhCdRoEIQgAQhCABCEIAEIQgATnfKbannNXIpvQotbTc9Qbz1qvzmm5XbVNCjlQ/W1TkS/C4uzflF5hqFIKoUbgPHpJ75x4mrlVkZTlZWHTEhF/aeeYDdaqqC7MAOv8A9+UjCs78xcq+2417k3+Np7o4QXzuc78DwUdCruHbJUd1HbUeiIQwN+e7t1Xyr4D956GzqXsKe0XPiZLhDMwzET+HUuCAdmnyiHBW1R3Q9uYHua/zky8LwzMLshZ6qc5Q69K+iw/Kb37jH6GJRwcp1G9Tow7RvEekfEYVX13MNzrow7+PZGmnvoxpobwN1Dp7Dej+F9V8NR3SZKZKTiqQ9QrnCqrKAA2W5sb3s2vfJh2ch5zO34mYfAWEqUVyDSJZqKPWHiJ4OKT218RGU2bSHqL3gE+JjwwqewvuiT7RaCecp7a+InpKincwPfE83T2F90ftG3wNNvUUHpAs3cRuh7Q0JNpc8iMQUxFWl6roKijoYHK9u0WMzI2eg1BcHpzsT8SR8I5h6dZHWpTrEOoIUsikWbeGHH4TWlKMZXuXFpPc63CYfB8sqyWGIohxuL0b3A6TTOvukzV7M2pRxCZ6LhwNDbQqehgdQeoz0YzUtja5NhAQmhQQhCABCEIAEI3Xroil3dVUC5ZiFA7SdJkdpcu0VXNCm9TKpOc+gm42Izatw3C0iUktySp27jfL4p29SjemnW3rsO/SRpHwSFUW+8jMx621PxMfnk1pZpNmEndiQhCZkBFiTzUcKLsQBxJNgO+NK4HqN1q6Jq7AdRO/s4mRjXeppTuq+2w/yKd/adJ5+rpmwBdz+dz1no+UpR5HY9jGluZTdusjIP8AFY27LwvXPBE72f8AaBFZ95WmOjnv47h4GR2SlmsXeo/FUZ3b3E0+E0UV2X/SkiR5Ot9qnch/VoeTr8KiHtpn/dPK7LvqMFiCOH1FT9ofwtuGExa/hpVh8oZXx/odnwJXpVStmFNx0XZO8EXsY1h8RUS61lIQWyvmzWHQ5sD3xw4asui0sYv4sPUYfFb/ABnrEVa9JM1ag+Ti5p1KRHaHFvjKyu2w8r4JysDqNx3cfjFvKTDYgnM1IqlI29J72VrEtlGgPDqjmZG356x4Cxyfolu2Z9OxOUnPj6Y0z3PQoLnwANp4GMY6rTc9oC/M3jDV3QaJTpDpdx8hp8Z5p1S+7EAnopqCe4HNKUFwPKSDiKvCj4uo/QwGJq8aJ7nQ/O0Whs6q/NTFt1+TdR4hAI4+ya670xY//N3H+Ux5FwGX6GzjGGppuO4N8FJnmltFUcVKVTyVQcWBQOPZdW0YdW+O1NnV0uWNdRa93oHKO/IJFrYl0A8pkZTuLBqd/eBB8ZUVleg0rHTOTG2/OqRcpkdHKOAQVLKAbqRwIYS4E43hsUqNnpM2Hc7mGiPfcDb0Wv8A+2nTOS22DiaJZ1yujmnUA5udQDdeogg987adTMjVMuYQhNBhG6lRVBdmsoBLEmwAAuSTwAEcmM5c7RzFcGm5xnrdSX9FPzEHuHXFOaSuxXsUe1dovi3zvcUEP1ScG6KjrxJ3gHcD0yBtM+hl6XVfFv8AgyWBIuNQlqYsbB7k23WBtfxnlyqOUrswcm2SrcIRYkzIFiXA36RZA2gnpIzqWQA3AF7E81ivG2sIq7sNK47iVJ1FXIvVlv4m9pEJoA3zGo3DU1CO4XC/CIKuFXeoHajD4kSdgKi1Dlw6M9vYRivZmtYeM0Sa0sy0voaIqvp/TS3TdyPkssdjbHeocuGpFr86odE7S55/5bzTbE5FFyr4oEJa60b7z01CN/4Rp03m0xbCjQcqAAiMVAFgMqkgAd03hT5LjDk4pyt2lRwbebqRXxA/qE3FGmT6gQG7N+ImZXAbd2g7Hzd6lwCxWinNA4kINBKHGYhqjs7ElnYsSd5JN5bcmeU1fAs70Mt3XK2YXFtbHt1M2UUtjVKxtuSH0q10daeMIemTlNS1nTrNucOnjO40KyuodSGVgCpG4g7jPkFgzlmsTqWYgaC51JtuE+hvocxzVNnIrH+m7Ip+6DcD4mMZv406A3BAIPA6xwRYgOWfSHyYpUAuNorlVHAq01F0IbTygXgwJG6euT/IupXUVMSzU0Oq0UIVmUjQ1HGo7BabnlM6rhqxYXHk2FukkWA7bkSwoD0FH3QPhE4pkuKbOX8uMVgdlIq0cNTbEODlzjPkG4u2a5PVOR4ja2JrvznZjeyoLD8qKNJcfShimfaeIzeqwQdQUAC0q+S+3amBrjEIqs2VlyuDlIa1z8BrKKJWxOWWNwjgpVcgH0qbksp6QQdRPoPkbylp47Dismjc104o3R2dE+Y9o4tq9V6rABqjFiFGgJ6BOk/QXimXE1qXqtTDEdDKd/hADuY1Ear4dGBVlVgeBUEfGPiLADGbW5B4aorZAaTH2OZ2eTPo6zF4ZsTsnECi65qNZ1sRfK7NlTNTJ1VhpdCTcDSdmmf5XYVGoiowv5BxXFxfSnq3flvbrtCK1E0Hcf8AFCHlx0v4QmtxWPGNxSUkao5siKWY9QFzb9pzFqzVHesws1Vi5B9VbAIncAJouXuNzeTwo9c+Uf8AAjCwP4mt3AygtOPFT2ijKb7CRbxITjMQhCEQBCEIwAgcRJGBx9agS2HfJcglcoZXtwZf13xiM4hGNijWIvoRcHt/4lRk09GVFtM6FsTlvSqWTEDyNTcMx+rfrV9w7DNRXpCojIea6lb79GBH6zhzYrhVS1+NsyHvGo75Z7K2rXo//GrnJ7DHOncDze606o1OTZT5KvkNyXortOthsaoJpgmmj6K/paMAedpYiM/S/snC0K6ebhUd1JqIlrL0Gw3Ey/2zjaWNA87w7JVXm4jDNdl/K2vdeYrHclBmLDEPUB9ZqTFu/wBLUzVST7lqSKbYu3a2HSrTpBSK65GuoZrfd6DPoH6NNiHC4Gmjizveow6C9rDwtOe8kdm7OwrrVqitWqjUXpAIh6Qt9T27p0VeXWHtzKvegH6wclyGZGsEaq1AoJYgAakkgADpvMnW5c0xzabHouQPhMptzbFTE882Tgg0UW6envkSqRX2JzRpdq7ew2IrUcLTqBlaqru4vkPkruqB9xJdV03WBE2ajScFe1UqiCyKwLMLgXXUKp7bXMs6GIrJrTxFZOgByV906SetFbk9Rdw+kTk+tLadHF1VJw1Z08obXCsNCG6jofGWv0p19ntgbIaRqXXyPkypYe7wtItfbWKdDTqVEqowsUqUkN+0gXvMXiuSisSUYJ1AMQOy5ldWPJSnEzOyNoNh6yV0VS1NswDC6nfvE7d9FGzKjGvtGsgRsSfQUDKoUbyF4AmYHY+wFoursiVipuA+cJ3qDrOg0eWmIUZfJ0Qo0AUOAOwX0h1Y8hnidJWeHYDU6ATm9flliWFlyJ1hb/OUuMx1Wr/UqO4OhBY28InWj21F1EdIxvKnB0+diEv7KnO3ZZbygG1m2gzogKYZHCvfR6rABwtvVTUX4ndMjsrY1avc0EREzFfKtxK87Ko53f0Tc8n9iphkZVdnZ2zuzcSAALAaAWA0m0E3q0NSbLTJCLaE2shnLsRijXr1a5OjtkTqRLhbdpue+EawqAIgG4KAPAR2eROTlJtnNJ3YkIQkEhCEIAEIQgAQhCACyK+AQm4BU+0hKn4SVCUpNDuQhh6g5tU9jqG+O+Lkre0nun95MhHmY7shha/tJ4NDLX6U8GjlfFouha59kase6NFqr6AeTXiTq57BuEpNh/J5qFxYPUVSx0Crdj2X+c9nZqHfmPTdyb9seoYVE3anixN2PfH4pS4Hc8qgAsAABwG6LCRqy1Aboykew2ngw3SErsgkwkJtoKn9RSnW2o7mGkBtKlvD37mP6Ssj4HZk2EhjaKHcHPYhg2Jc82k3a5Cjw3wysEiWTPWAwVTEvkpCybnrHmoOIQ+s/ZpJXJbZdLEs3nDnOli2HF1W3Bi291+E6HQpKihEUKq6BVAAHZaddCgt2axjbUa2dgko00pILKgyjj3k8Sd/fJMITuSS0NUFoQhGM495y3ooigkKCxJIVLgWv19U9lq/AUz3t+0Y2NucHnB7nvUEHw0lnPFk7O1jkloyA2PKWFVCl/XHpJ323dsnKwIuDcHUEdEUi+hkDCqabmle6sCyX9Wx9Jf174aNfYbonQhCQIIQhGAQhCABCEIgBuqRThnfnubeynojvO8yWIt407bDuM06CrzVA+fed5jkWJAQQhCIAixIRgBUHQi/UdxjWHw2S4Um28Le9uyPRYKTQ7iXPGF4GJBMR4amQyujZHTVHHDpB6VPETd8mdujEoQRlqpZaiDW3Qw6VbpmIhhcUcPXTEA6AhKo4FGNmv1i+Ydk6cPWyyys1hLsdShEVgdQb9cWelc1CEIRAcbankdKg3MAlTw9Fvl4yyEYakHTKdzAD4RMHUJQX3i6ntXQ/vPHlqczJEg7TFgrjejAn8LaN8/hJ8j4xLo46VPyMmLsw7jwMI1hHuiH7o+UeET0ER8TilSwILMdyrvPXbgOuMeVrncqIOslz8LTzSW9ao3QEUdmpkuXfKerh8JCUFKWtyNnxA4o3VZl/eKMa68+mwHSnpj4a/CPs1t5t2xAwOoIPYYXvujaeCpdtGLQxSPzXB6uI7RH5CrYVH1YC/A7mHYRrPCJVXRXDLwDi7Dqzg/pCye2hx1MBJftdywhIIxVQc6mD1o4+TWh/EkHPR16yjW8RpFlfY53QnHdE60JHpY6m3NdSeIDD5R8NfdE4tdjNwkt0LEixIEBCEIgCLEhABYQEIbgE8VqYZWU7mUgjtnmviEQXZ1A6yJGbGlreTQtv9JvQQDpF9W7hLjF3uaQpzk9EdI5JYovhKJbnKuRu1CUP+WXE5tyY2zVwzpRco1Ko5UkLlZHqNoQbm6lmA13XvOkz1YSUoo6JRcdwhCE0J0OVUjovYPkJFwzWrVE4EK479D8hJVPmjsHykOppiEPtIw71YH9Z4y3aOZdyfAiJFk2EQ9lH6sD2br4EyZIOyxYOOio/wC4k6OW7G9ytxVQU6qsea/oE9DDcT0DhJgi4mgrqUYaEeHQZW4LEMjeRq84cx+Djhr0x7x03PUweIVskv6JtenmXLpru0B14aH9Zb8nsLs7E2oVqXm2KA0ZHZFq29ZNcpJ35baSsjOIw6uLMLjhwIPAht4MqnPLo9jtrUs+q0ZqMdyAxFLM9HECogBOSqMrAD766HwmZxy1cPbzig6A6hwM9Nr/AH10HfLnZXKvFUUNKpbEU8pVSTlqrcWF2Oj6dNj1zc7E5SYTEKtMVFD5QDTf0W3a2VucOsaTfLCZyZ6tLc5Xh8Uji6MG7CDHZ0XafI/AvUQ+boudmDFAUJ06UIkHGfRvSNzh69WkeCkiog7nu3xkyoPsy44pP9yMJUoI3ORT2gRltnpwuv4WZfgDaX2J5HbQpsFBo1c18tiyMcoub3uBIZ2TjlvmwVQW3lWR/grXPhJ6UkaKpSkVwwzjm1X7GyMP8t4v143OjdqNfxDfpPWIxIp/1Vekf/spunhnAvCnikbmurdhB+Uh5luhdGhLgQV6/sIfzkfAie1xD8aevU4/UT2COmKZN/oX4dI8HEv7B95YhxD8E8WA+QMc0hp0xa8B+HSGDWrtuCKOvM/w9H5zycM7c+q3YgCX6r2J+MkM4HEeMh1tq0U0LrfqOb4DWUs3ZDWHox4HqOERNcuvSfSPvHWPkRcDRr1/6OGquN+YoUTtzPbTsvL7ZXI13AfFVPROvkqdwpHAM/OPdaaQoyk9Ryq04L2lRsTAtiayBBenTdXqP6t0IZUB9ZiQL23CdQEawmFSmgRECKosFUWFo9PQhBRVjz6kszuwhCEsz0OUYdwVUjcQPlreRdoaPRI35yvvA6fAS+5W4FcNUFUEClWJzD7NzclgPZbW/AHtlBSPlKpYcymLL0Fzqx7hYTy503CTuYyjZlhEhCYmZUtga93K1FQO2bRcx6N9xwklMAwGtepf8v8Atk6EpzbG5XIDYWouqVWJHquAVPVcAHviXSupR1s685b+kh4Mp/WWEguf+oFt+Rr+K2vCLZSYw2IelpVBZeDj/WOHbJdN1YZlII4EG8kso3fCVtTZdjmouUO8jejdq8Ie17nfRxrWktSaDGa+GV+cL2N78QeFjwMYbFMmlRCPvIC6+G8eEfoYhHF0YHp6R2iFmtUehGrTqbMscPt3GU8pWv5QLqq1RmA/OLN8TNXsz6QVItiaLUzxZPrE8B6Q8DMSIGXGtJEyw0J7aHRhyswLVVY4hFAQ2z5k9IncQwFjaaPCY2nUXNTdHHSjBh8DOKNTBFiAe0RmjhVRs9MvTbpR2T/LNY4hdzCWEa2Z2nF0VesgZQwyubEAjo/WRcXyTwNTn4WkevIoPiJzfA8oMbSYEVhVC3AFVbmx3+kpBM0FP6RXUDPhc3TkqD4Bh+s1VSD7mMqM49ix2pyI2etNmXDICBoRmFidAd+vZHl+j3ZxAPm499/3lPi/pBpujIcNWS+mayMBx4GWI+kfBDTLW/8AE0eaJNp/Y+3IDZoB/wCmG72n/eRMF9HmznpozYfVlBNncf6o430iYMg2Wtu+yP7xvAcvcKlNVK1bqLH6v/mLNHkVqn2SaP0c7NU382Dfid2HgTaTdhbBwyZ2TD01IqMFIVbgC1gDK8/SHhPZrf8AjP7yNgeXmFRWutXV2YWpnce0x5o8hlm+zNtVUZW09U/KUeF5i/hHymW2l9JhKt5DC1CANWqEJpxsupM0uzKoelTddzIjdO9RNaUk9iJRa3RKhCE1ICEIQA4TUruTnNR2YXtnYsLHVtDwNpcbKS1JDuJGY9ra/rKN+afwn5TQYEfVp+EfITb12lGnKOVWujhpTck78j8IQnzxoEIQgA3incISi5m4Dd85XYSsU1dGDNq76EX7joJbCeXAsb9B8JUX2GmKpuIsg7LrqaaDMCQtrXF+gSbeJxsGoojT4RCblRfpGh8RHrRIaoabjsQnwTjVKjdjWYfHWefKVF5yZhxKH/SdR4yfCO50QxdSJX/xCmN7ZfxKV+Yj9Koragg9hv8AKPugbQgHtkR9mUj6gH4SR8o/adUfUPkh/jFvIzbOtzKjr1Zr/Azx5rWHNrX/ABIPmIKK7G0cdB7kuEr6r10BZvJsBv1ZTrutvueqS6VDFsAwwjsDuIIF+5rWl9KbWhosVBjsWeGp4gC7YSuPyq3+Uxry540qo7aT/pE6U+C1XpvuSIkaFX7lT/xVP9s8+WYmy0qrHgFpPr4gCJU58D60F3HajgKSdw39lpvuRlNlwVEPvyki/ssxK/AiZnY3JWtWYPiV8nSFj5K93cjUZyNFXq4zoKiwAHAWt0Wndh6birs4cTVUnoLCEJ1nOEIQgBwVuaT90/KaLBCyIPuD5CZx9UI+6flL7ZmJV6aMu61j0gjeJ1f+hjJyg+1jzqOz/klQhCfMGoQhCACymr4ioXIqqUogkZhrm6Mx4Ay5iPaxDbra9kuDSHF2Ioo0WG5Du3W/SINn0+AI/Cxmeo0lsdBzmt2Zjb4RwUxwuOxjPfpeh1KkFNPdXM3WipNF5/DxweoPzmL5m43VnHblPzlMucbnf3p6FWoP+4/fYxP0LELgfWgW3kKvCt/gWL5Gt9qPcEqvO632h8BDzut9ofdEn9FxPCF1oclr5Gt9qvuCBoVftR7iyq85q/aN4CeHqud9R+6wlR9DxPCDrRLhsK451drdirIWJqUlBBd6jDgHJB7baCV7Uwd9z2kme1Ft2k7aHoMk05siWIitgwDmk6VcodkcOEYnIbX07r6HpE63sDlNQxICqclQD0qbmzDs9odYnJZ5Kag7mG5gSGB6iN076/pMHH2aNBTxVn7tjvIgZzXk9y2emQmKJdNAKlvTT8YHOHXOi0a6uodGDKwuCpuCOkTw61CVKVpI7oTjJXiOwEBCZWRoEIQjAIQhAAhCEAOCDmj8P6Tzs5mRVKNlNhfip7RGvPaeXnjm9I6J5w+MphVGcbhpcT6WtHD4i0ZtNWfc8tKcU7J7l3R2uRz109pbkd67xJY2nR+0WZ7z2l7a+Ii+eUvtF8RPIrei4WT9lRL+yo1J94vwaL+I0uFRfGH8QpfaJ4zNnF0faXxERsTRO9k8RMP0On/lXkrO/i/Bo32nRGvlF7AbnwErcZtNql1pgqp0LHnEccolSMRRDKQyiwPER/z2l7a+Im2E9Iw0Jt1KidntfQJSml7U/A9TQAADhPRkfz2l7a+Ih59S9seIn00a1GKSUlZfaORwm3ez8D8WR/PqXtr4iHn1L218RK/Io/JeQ6c+H4JELyP57S9tfEQ89pe2viIfkUfkvIdOfD8EiAMj+e0vbXxEPPaXtr4iH5FH5LyLpz4fgkQkfz2l7a+Ih57S9tfEQ/Io/JeR9OfxfgkQkfz2l7a+Ih57S9tfEQ/Io/JeQ6c/i/A/aankFt00awwzn6upcU+hG3leoHXvmP8APqftr7wiNjadtKgBuCpzDQjUHuM4sYqFaD9yv/JvQ6kJbO38H0BCZLYHLfCVMOjVsRTp1LZXVmAOYaEgdB3yx/m7Af3lH3xPl20memti8hKP+bsB/eUffEP5uwH95R98RXQy8hKP+bsB/eUffEP5uwH95R98QugLyEo/5uwH95R98QhdAf/Z"
                      UserName={following.username!}
                    />
                    <button
                      className="px-4 py-2 bg-gray-300 rounded-xl font-black hover:text-violet-500"
                      onClick={handleDeleteFollower}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

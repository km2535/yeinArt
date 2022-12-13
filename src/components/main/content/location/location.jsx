import React, { useEffect } from "react";
import styles from "./location.module.css";
import "./location.css";
export default function Location() {
  useEffect(() => {
    let container = document.getElementById("map");

    let options = {
      center: new window.kakao.maps.LatLng(
        37.597414142094905,
        127.01305621352618
      ),
      level: 5,
    };

    let map = new window.kakao.maps.Map(container, options);

    let geocoder = new window.kakao.maps.services.Geocoder();
    map.setZoomable(false);
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(
      "서울특별시 성북구 돈암동 성북로4길 52",
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          let coords = new window.kakao.maps.LatLng(
            37.597414142094905,
            127.01305621352618
          );
          let content = '<div class="overlay_info">';
          content +=
            '    <a href="http://kko.to/1iu2Akb-jO" target="_blank"><strong>예 인 아 트</strong></a>';
          content += '    <div class="desc">';
          content += '        <img src="./images/logo.jpg" alt="">';
          content +=
            '        <span class="address">서울특별시 성북구 성북로 4길 52 스카이프라자 상가 동관 631호</span>';
          content += "    </div>";
          content += "</div>";
          let position = new window.kakao.maps.LatLng(
            37.5944725333435,
            127.012706037821
          );
          let mapCustomOverlay = new window.kakao.maps.CustomOverlay({
            position: position,
            content: content,
            xAnchor: 0.5,
            yAnchor: 1, // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
          });
          mapCustomOverlay.setMap(map);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      }
    );
  }, []);
  return (
    <div className={styles.mapFrame}>
      <div className={styles.title}>
        <p className={styles.mainTxt}>visit us</p>
        <p className={styles.line}></p>
      </div>
      <div id={"map"} className={styles.map}></div>
      <div className={styles.info}>
        <p className={styles.addrTxt}>오시는 길</p>
        <p className={styles.addr}>
          서울특별시 성북구 성북로 4길 52 스카이프라자 상가 동관 631호
        </p>
        <p className={styles.phoneNumber}>
          <a className={styles.phone1} href="tel:02-764-3931">
            (02)764-3931
          </a>
          |
          <a className={styles.phone2} href="tel:010-3725-2211">
            010-3725-2211
          </a>
        </p>
      </div>
    </div>
  );
}

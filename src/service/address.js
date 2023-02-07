export function kakaoPostcode(id, address) {
  new window.daum.Postcode({
    oncomplete: function (data) {
      var addr = ""; // 주소 변수
      //var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // document.getElementById("departure").value = addr;
      let geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(addr, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          // let coords = result[0].y + "," + result[0].x;
          address((prev) => ({ ...prev, [id]: addr }));
        }
      });
    },
  }).open();
}

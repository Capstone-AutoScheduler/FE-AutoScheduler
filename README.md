# <img width="30%" alt="스크린샷 2024-12-13 오전 11 41 06" src="https://github.com/user-attachments/assets/c8818f4f-199f-4cae-8725-23f54cf0896c" />


AutoScheduler는 자동화 웹 캘린더로 사용자가 정의한 일정 생성기를 통해 원본 데이터를 자동으로 처리하여 캘린더 일정을 생성하는 업무 자동화 도구입니다. 기존의 캘린더 앱에서는 제공하지 않는 강력한 자동화 기능을 통해 데이터 기반 일정 생성 및 관리를 제공합니다.

---

## 주요 기능

### 1. 자동 일정 생성
- **PDF 기반**: PDF에서 일정 데이터를 추출하여 자동으로 일정 생성.
- **WEB 기반**: 웹 URL에서 일정 데이터를 가져와 일정 자동 생성.

### 2. 캘린더 관리
- 생성된 일정들을 직관적으로 캘린더 화면에서 확인 가능.
- 일정 추가, 수정, 삭제와 같은 기본 작업 지원.

### 3. 일정 생성기 관리
- 사용자가 직접 일정 생성기를 제작, 수정 및 삭제 가능.
- 생성기 스토어에서 다른 사용자의 생성기를 확인 및 북마크하여 재사용 가능.

---

## 주요 화면 구성

### 1. 메인 캘린더
- 생성된 일정을 캘린더 형식으로 확인 가능.
- 일정 세부 정보를 확인하고 수정 가능.

### 2. 나의 일정 생성기
- 사용자가 직접 만든 생성기를 관리할 수 있는 공간.
- 새로운 생성기 제작 및 기존 생성기 수정/삭제 가능.

### 3. 생성기 스토어
- 다른 사용자가 제작한 생성기를 확인 및 북마크 가능.
- 북마크한 생성기는 "나의 일정 생성기"에 추가하여 재사용 가능.

---

## 사용 방법

### 일정 생성기 정의

### [PDF 기반 일정 생성]
1. **새로운 생성기 추가**:
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/0df15990-c06f-4502-8043-a69e864333bd" />

   - 내 생성기 페이지에서 `[+새로운 생성기]` 버튼 클릭 후 원본 파일로 PDF를 선택합니다.

2. **PDF 업로드 및 영역 지정**:
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/c28b1aee-22c8-41f5-bad0-cfa03356d388" />

   - 작업을 진행할 PDF 파일을 업로드합니다. 
   - 이후 일정 생성에 필요한 내용을 초록 박스로 영역 지정합니다.

3. **Frame 항목 추가**:
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/ff1a7326-0496-40f4-ab44-6b980ec0454f" />

   - 지정한 영역을 Frame의 `Title` 또는 `Detail` 항목으로 드래그하여 추가합니다.
   - 해당 작업은 생성하고자 하는 일정의 개수만큼 반복 진행해주어야 됩니다.

4. **날짜 설정**:
<img width="35%" alt="image" src="https://github.com/user-attachments/assets/91d4b815-7ef0-4f8e-9ce2-5b439790dd28" />
<img width="35%" alt="image" src="https://github.com/user-attachments/assets/93f4017f-b26a-4a1b-932b-39ba96bc2782" />

   - 시작 날짜 지정 후 일정 간격을 설정합니다. (예: `YYYY-MM-DD + (7 * 1)` 형식)
  
8. **생성기 저장**:
- 생성기의 제목 및 설명을 작성 후 저장합니다.

### [WEB 기반 일정 생성]
1. **새로운 생성기 추가**:
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/16fdb9c5-de1a-482a-aba2-e3c22a71fb47" />

   - 내 생성기 페이지에서 `[+새로운 생성기]` 버튼 클릭 후 원본 파일로 WEB를 선택합니다.
2. **WEB url 업로드 및 영역 지정**:
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/02cdc535-6ebe-48df-8603-06a5b2ee3ab0" />

- 작업을 진행할 WEB url을 업로드합니다.

3. **Frame 항목 추가**:
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/c5df3e6f-672d-4085-a3fd-43972e8cf273" />

   - 필요한 내용을 Frame의 `Title` 또는 `Detail` 항목으로 드래그하여 추가합니다.

5. **날짜 설정**:
- 일정의 날짜를 `YYYY-MM-DD` 형식으로 지정합니다.

6. **생성기 저장**:
- 생성기의 제목 및 설명을 작성 후 저장합니다.

---

## 자동 생성 일정 확인 및 관리
1. 생성기에서 지정한 일정 데이터를 기반으로 자동으로 캘린더 일정 생성.
2. 캘린더 미리보기를 통해 반영된 일정 확인 가능.
3. 자동 생성된 일정은 필요에 따라 수정 가능.

---

## 기술 스택
<img width="50%" alt="image" src="https://github.com/user-attachments/assets/34f9bb93-1861-4aa5-a0de-2fc167e3e124" />

- **Frontend**: React
- **Backend**: Spring Boot
- **Database**: PostgreSQL
- **Deployment**: Docker, AWS EC2

---

## Backend 아키텍쳐
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/aebe1a9a-80f4-4f13-91a7-4baa70ffaff3" />


---

## Contributors
**김진호(@Jinho622)[FE]  /  박재현(@ParkJh38)[BE]  /  송영범(@zxc534)[FE]**


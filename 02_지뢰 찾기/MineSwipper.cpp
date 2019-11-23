#define _CRT_SECURE_NO_WARNINGS
#include "Plate.h"

int main(void) {	
	SetConsoleSize(60, 30);
	FirstPlateMakingProcess();
	int mine[8]; int inputx = 0, inputy = 0;//지뢰가 들어갈 배열을 생성했고 인풋값을 만듦
	MineMakingProcess(mine); int count = 0;
	
	printf("n,m의 좌표를 입력해주세요 \n 입력한 값에 지뢰가 있으면 ● 이 뜹니다.\n ");
	//printf("%d %d   %d %d   %d %d\n", mine[0], mine[1], mine[2], mine[3], mine[4], mine[5]);//지뢰 검사 프로그래밍이 끝나면 삭제 요망
	while (1) {
		
		printf("\n\n ( n , m ) 입력해, 단! 지뢰를 찾았으면 그 값에 +100을 해줘.\n\n");
		scanf("%d %d", &inputx, &inputy);
		
		if (inputx == mine[0] && inputy == mine[1] || inputx == mine[2] && inputy == mine[3] || inputx == mine[4] && inputy == mine[5]) {
			MessageBox(NULL, "지뢰 터짐 ㅅㄱ염", "made by wonikjang//", MB_OK);
			break;
		}
		else if(inputx == mine[0] + 100 && inputy == mine[1] + 100 || inputx == mine[2] + 100 && inputy == mine[3] + 100 || inputx == mine[4] + 100 && inputy == mine[5] + 100) {
			MessageBox(NULL, "지뢰를 잘 찾아냈습니다.", "made by wonikjang//", MB_OK);
			ReplacingHit(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[0] - 1 && inputy == mine[1] - 1) || (inputx == mine[0] - 1 && inputy == mine[1])) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[0] - 1 && inputy == mine[1] + 1) || (inputx == mine[0] && inputy == mine[1] - 1)) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[0] && inputy == mine[1] + 1) || (inputx == mine[0] + 1 && inputy == mine[1] - 1)) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[0] + 1 && inputy == mine[1] - 1) || (inputx == mine[0] + 1 && inputy == mine[1]) || (inputx == mine[0] + 1 && inputy == mine[1] + 1)) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		///////////////////////
		

		else if ((inputx == mine[2] - 1 && inputy == mine[3] - 1) || (inputx == mine[2] - 1 && inputy == mine[3])) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[2] - 1 && inputy == mine[3] + 1) || (inputx == mine[2] && inputy == mine[3] - 1)) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[2] && inputy == mine[3] + 1) || (inputx == mine[2] + 1 && inputy == mine[3] - 1)) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[2] + 1 && inputy == mine[3] - 1) || (inputx == mine[2] + 1 && inputy == mine[3]) || (inputx == mine[2] + 1 && inputy == mine[3] + 1)) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}
		/////////////////////////////////////
		

		else if ((inputx == mine[4] - 1 && inputy == mine[5] - 1) || (inputx == mine[4] - 1 && inputy == mine[5])) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[4] - 1 && inputy == mine[5] + 1) || (inputx == mine[4] && inputy == mine[5] - 1)) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[4] && inputy == mine[5] + 1) || (inputx == mine[4] + 1 && inputy == mine[5] - 1)) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[4] + 1 && inputy == mine[5] - 1) || (inputx == mine[4] + 1 && inputy == mine[5]) || (inputx == mine[4] + 1 && inputy == mine[5] + 1)) {
			MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}
		

		else if ((inputx == mine[6] - 1 && inputy == mine[7] - 1) || (inputx == mine[6] - 1 && inputy == mine[7])) {
		MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
		ReplacingNear(inputx, inputy);
		UpdatedPlate();
		}

		else if ((inputx == mine[6] - 1 && inputy == mine[7] + 1) || (inputx == mine[6] && inputy == mine[7] - 1)) {
		MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
		ReplacingNear(inputx, inputy);
		UpdatedPlate();
		}

		else if ((inputx == mine[6] && inputy == mine[7] + 1) || (inputx == mine[6] + 1 && inputy == mine[7] - 1)) {
		MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
		ReplacingNear(inputx, inputy);
		UpdatedPlate();
		}

		else if ((inputx == mine[6] + 1 && inputy == mine[7] - 1) || (inputx == mine[6] + 1 && inputy == mine[7]) || (inputx == mine[6] + 1 && inputy == mine[7] + 1)) {
		MessageBox(NULL, "지뢰가 근처에 있다", "made by wonikjang//", MB_OK);
		ReplacingNear(inputx, inputy);
		UpdatedPlate();
		}

		else {
		printf("\n계속 찾아라잉 \n");
		count++;
		if (count == 3) {
			UpdatedPlate();
			count = 0;
		}
		}


	}

	system("pause");
	return 0;
}


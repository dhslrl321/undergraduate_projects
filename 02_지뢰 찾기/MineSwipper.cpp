#define _CRT_SECURE_NO_WARNINGS
#include "Plate.h"

int main(void) {	
	SetConsoleSize(60, 30);
	FirstPlateMakingProcess();
	int mine[8]; int inputx = 0, inputy = 0;//���ڰ� �� �迭�� �����߰� ��ǲ���� ����
	MineMakingProcess(mine); int count = 0;
	
	printf("n,m�� ��ǥ�� �Է����ּ��� \n �Է��� ���� ���ڰ� ������ �� �� ��ϴ�.\n ");
	//printf("%d %d   %d %d   %d %d\n", mine[0], mine[1], mine[2], mine[3], mine[4], mine[5]);//���� �˻� ���α׷����� ������ ���� ���
	while (1) {
		
		printf("\n\n ( n , m ) �Է���, ��! ���ڸ� ã������ �� ���� +100�� ����.\n\n");
		scanf("%d %d", &inputx, &inputy);
		
		if (inputx == mine[0] && inputy == mine[1] || inputx == mine[2] && inputy == mine[3] || inputx == mine[4] && inputy == mine[5]) {
			MessageBox(NULL, "���� ���� ������", "made by wonikjang//", MB_OK);
			break;
		}
		else if(inputx == mine[0] + 100 && inputy == mine[1] + 100 || inputx == mine[2] + 100 && inputy == mine[3] + 100 || inputx == mine[4] + 100 && inputy == mine[5] + 100) {
			MessageBox(NULL, "���ڸ� �� ã�Ƴ½��ϴ�.", "made by wonikjang//", MB_OK);
			ReplacingHit(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[0] - 1 && inputy == mine[1] - 1) || (inputx == mine[0] - 1 && inputy == mine[1])) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[0] - 1 && inputy == mine[1] + 1) || (inputx == mine[0] && inputy == mine[1] - 1)) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[0] && inputy == mine[1] + 1) || (inputx == mine[0] + 1 && inputy == mine[1] - 1)) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[0] + 1 && inputy == mine[1] - 1) || (inputx == mine[0] + 1 && inputy == mine[1]) || (inputx == mine[0] + 1 && inputy == mine[1] + 1)) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		///////////////////////
		

		else if ((inputx == mine[2] - 1 && inputy == mine[3] - 1) || (inputx == mine[2] - 1 && inputy == mine[3])) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[2] - 1 && inputy == mine[3] + 1) || (inputx == mine[2] && inputy == mine[3] - 1)) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[2] && inputy == mine[3] + 1) || (inputx == mine[2] + 1 && inputy == mine[3] - 1)) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[2] + 1 && inputy == mine[3] - 1) || (inputx == mine[2] + 1 && inputy == mine[3]) || (inputx == mine[2] + 1 && inputy == mine[3] + 1)) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}
		/////////////////////////////////////
		

		else if ((inputx == mine[4] - 1 && inputy == mine[5] - 1) || (inputx == mine[4] - 1 && inputy == mine[5])) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[4] - 1 && inputy == mine[5] + 1) || (inputx == mine[4] && inputy == mine[5] - 1)) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[4] && inputy == mine[5] + 1) || (inputx == mine[4] + 1 && inputy == mine[5] - 1)) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}

		else if ((inputx == mine[4] + 1 && inputy == mine[5] - 1) || (inputx == mine[4] + 1 && inputy == mine[5]) || (inputx == mine[4] + 1 && inputy == mine[5] + 1)) {
			MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
			ReplacingNear(inputx, inputy);
			UpdatedPlate();
		}
		

		else if ((inputx == mine[6] - 1 && inputy == mine[7] - 1) || (inputx == mine[6] - 1 && inputy == mine[7])) {
		MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
		ReplacingNear(inputx, inputy);
		UpdatedPlate();
		}

		else if ((inputx == mine[6] - 1 && inputy == mine[7] + 1) || (inputx == mine[6] && inputy == mine[7] - 1)) {
		MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
		ReplacingNear(inputx, inputy);
		UpdatedPlate();
		}

		else if ((inputx == mine[6] && inputy == mine[7] + 1) || (inputx == mine[6] + 1 && inputy == mine[7] - 1)) {
		MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
		ReplacingNear(inputx, inputy);
		UpdatedPlate();
		}

		else if ((inputx == mine[6] + 1 && inputy == mine[7] - 1) || (inputx == mine[6] + 1 && inputy == mine[7]) || (inputx == mine[6] + 1 && inputy == mine[7] + 1)) {
		MessageBox(NULL, "���ڰ� ��ó�� �ִ�", "made by wonikjang//", MB_OK);
		ReplacingNear(inputx, inputy);
		UpdatedPlate();
		}

		else {
		printf("\n��� ã�ƶ��� \n");
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


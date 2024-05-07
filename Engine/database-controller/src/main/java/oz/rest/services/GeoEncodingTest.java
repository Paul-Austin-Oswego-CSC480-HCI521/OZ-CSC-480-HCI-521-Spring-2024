package oz.rest.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class GeoEncodingTest {

    public static void main(String[] args) {
        try {

            Scanner addScanner = new Scanner(System.in);
            System.out.println("Please enter zipcode 1:");
            String zipCode1 = addScanner.nextLine();
            System.out.println("Please enter zipcode 1:");
            String zipCode2 = addScanner.nextLine();
            float[] coords1 = getZipCodeCoords(zipCode1);
            float[] coords2 = getZipCodeCoords(zipCode2);
            System.out.println(distance(coords1, coords2));

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static float[] getZipCodeCoords(String zipCode) throws IOException {
        String accessToken = "pk.eyJ1IjoiaGpyb3NlMjkiLCJhIjoiY2x1MGFmbzNmMDJxYTJrbnAyY3J6MWN1NiJ9.T_K    7aTjSSiqtAIeRbL5Msw";
        URL url = new URL("https://api.mapbox.com/geocoding/v5/mapbox.places/"
                + zipCode
                + ".json?access_token=" + accessToken);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        line = reader.readLine();
        int ind = line.indexOf("coordinates\":[");
        String coordString = line.substring(ind + 14, ind + 35);
        coordString = coordString.substring(0, coordString.indexOf(']'));
        float[] coords = new float[2];
        coords[1] = Float.parseFloat(coordString.substring(0, coordString.indexOf(',')));
        coords[0] = Float.parseFloat(coordString.substring(coordString.indexOf(',') + 1));
        return coords;
    }

    public static float distance(float[] coords, float[] coords2) {
        double lat1Rad = Math.toRadians(coords[0]);
        double lon1Rad = Math.toRadians(coords[1]);
        double lat2Rad = Math.toRadians(coords2[0]);
        double lon2Rad = Math.toRadians(coords2[1]);

        double latDiff = lat2Rad - lat1Rad;
        double lonDiff = lon2Rad - lon1Rad;

        // Haversine formula
        double a = Math.pow(Math.sin(latDiff / 2), 2)
                + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.pow(Math.sin(lonDiff / 2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        float distance = 6371 * (float) c;

        return distance;
    }
}
